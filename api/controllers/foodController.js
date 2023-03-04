const express = require("express");

const database = require("../configures/database");

const food = express.Router();

const multer = require("multer");

// seraching food 
food.get("/search/", (req, res)=>{
    try {
        const search = req.query.text

        const checkingSql = `SELECT * FROM food_items WHERE food_name LIKE '%${search}%'`;

        database.query(checkingSql, (error, results)=>{
            if (error) {
                res.status(400).json({
                    server : false,
                    message : "item not found",
                    error
                })
            } else {
                if (results === 0) {
                    res.status(400).json({
                        server : false,
                        msg : "item not found"
                    })
                } else {
                    res.status(200).json({
                        server : true,
                        results
                    })
                }
            }
        })
    } catch (error) {
        res.status(500).json({
            server : false,
            message : "invalid id",
            error
        })
    }
});

// getting unique food
food.get('/:food_id', (req, res)=>{
    try {
        const id = req.params.food_id;

        const sql = `SELECT * FROM food_items WHERE food_id = '${id}' AND food_ifdeleted = '0'`;

        database.query(sql, (err, results)=>{
            if (err) {
                res.status(400).json({
                    server : false,
                    message : 'sql error',
                    err
                })
            } else {
                if (results.length != 0) {
                    res.status(200).json({
                        server : true,
                        mesage : 'item found succesfully',
                        results
                    })
                } else {
                    res.status(400).json({
                        server :false,
                        message : 'item not found'
                    })
                }
            }
        })
    } catch (error) {
        res.status(500).json({
            server : false,
            message : 'invalid info',
            error 
        })
    }
})

// getting list of foods
food.get("/food/items/", (req, res)=>{
    try {
        const sql = `SELECT * FROM food_items WHERE food_ifdeleted = '0'`;

        database.query(sql, (err, results)=>{
            if (err) {
                res.status(400).json({
                    server : false,
                    message : "no list found",
                    err
                })
            } else {
              if(results.length === 0){
                res.status(400).json({
                    server : false,
                    message : "items not found",
                
                })
              }
              else{
                res.status(200).json({
                    server : true,
                    message : "items found succesfully",
                    results
                })
              }
            }
        })

    } catch (error) {
        res.status(500).json({
            server : false,
            message : "invalid list",
            error
        })
    }
});

// creating food item with image
const internalstorage = multer.diskStorage({
    destination : function (err, file, cb){
        cb(null, "./pictures")
    },
    filename : function(err, file, cb){
        cb(null, file.originalname)
    }
})
 var upload = multer({storage : internalstorage})
food.post("/create", upload.single("sambar"), (req, res)=>{
    try {
        const id = Math.floor(10000000 * Math.random() + 9999999);
        const name = req.body.food_name;
        const type = req.body.food_type;
        const amount = req.body.food_amount;
        const description = req.body.food_description;
        const image = req.file.path;
        const status = req.body.food_status;
        const ifdeleted = req.body.food_ifdeleted;
    
    let createSql = `INSERT INTO food_items(food_id, food_name, food_type, food_amount, food_description, food_image, food_status, food_ifdeleted)
                     VALUES ('${id}', '${name}', '${type}', '${amount}', '${description}','${image}', '${status}', '${ifdeleted}' )`;
    
        database.query(createSql, (error, results)=>{
            if(error){
                res.status(400).json({
                    server : false,
                    message : "item not created",
                    error
                })
            }
            else{
                res.status(200).json({
                    server : true,
                    message : "item created succesfully",
                    results
                })
            }
        })

    } catch (error) {
        res.status(500).json({
            server :false,
            message : "invalid details",
            error
        })
    }
});

// updating food item 
food.put("/update/", (req, res)=>{
    try {
        const id = req.body.food_id;
        const name = req.body.food_name;
        const type = req.body.food_type;
        const amount = req.body.food_amount;
        const description = req.body.food_description;
        const status = req.body.food_status;
        const ifdeleted = req.body.food_ifdeleted; 

        exSql = `SELECT * FROM food_items WHERE food_id = '${id}' AND food_ifdeleted = '0'`;

        database.query(exSql, (error, results)=>{
            if(error){
                res.status(400).json({
                    server: false,
                    message : "user not found",
                    error
                })
            }
            else{
                const updateSql = `UPDATE food_items 
                SET food_name = '${name}', 
                food_type = '${type}',
                food_amount = '${amount}',
                food_description = '${description}', 
                food_status = '${status}',
                food_ifdeleted = '${ifdeleted}'
                WHERE food_id = '${id}'`;

                database.query(updateSql, (error, results)=>{
                    if(error){
                        res.status(400).json({
                            server :false,
                            message : "item not updated",
                            error
                        })
                    }
                    else{
                        res.status(200).json({
                            server :true,
                            mesage : "item updated succesfully",
                            results
                        })
                    }
                })
            }
        })
    } catch (error) {
        res.status(500).json({
            server: false,
            message : "invalid id",
            error
        })
    }
});

// deleting food item
food.delete("/delete/:food_id", (req, res)=>{
    try {
        let id = req.params.food_id;

        const checkSql = `SELECT * FROM food_items WHERE food_id = '${id}' AND food_ifdeleted ='0'`;

        database.query(checkSql, (error, results)=>{
            if (error) {
                res.status(400).json({
                    server : false,
                    message : "item not found",
                    error
                })
            } else {
                if (results != 0) {

                    const deleteSql = `UPDATE food_items SET food_ifdeleted = '1' WHERE food_id = '${id}'`;
            
                    database.query(deleteSql, (error, results)=>{
                        if (error) {
                            res.status(400).json({
                                server :false,
                                mesage : "item not deleted",
                                error
                            })
                        } else {
                            res.status(200).json({
                                server :true,
                                message : "item deleted",
                                results
                            })
                        }
                    })
                    
                } else {
                    res.status(400).json({
                        server :false,
                        msg : "item not found"
                    })
                }
                
               
                   
            }
        })
    } catch (error) {
        res.status(500).json({
            server : false,
            mesage : "you have entered invalid item id",
            error
        })
    }
});

module.exports = food;