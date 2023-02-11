const express = require("express");

const database = require("../configures/database");

const food = express.Router();

food.get("/", (req, res)=>{
    try {
        res.send("succesfully working food items")
    } catch (error) {
        res.send("failed to load food items")
    }
});

food.get("/search/:food_id", (req, res)=>{
    try {
        const id = req.params.food_id;

        const checkingSql = `SELECT * FROM food_items WHERE food_id = '${id}'`;

        database.query(checkingSql, (error, results)=>{
            if (error) {
                res.json({
                    message : "item not found",
                    error
                })
            } else {
              if(results.length === 0){
                res.json({
                    server : false,
                    message : "item not found",
                })
              }
              else{
                res.json({
                    server : true,
                    results
                })
              }
            }
        })
    } catch (error) {
        res.json({
            message : "invalid id",
            error
        })
    }
});

food.get("/items/", (req, res)=>{
    try {
        const sql = `SELECT * FROM food_items`;

        database.query(sql, (err, results)=>{
            if (err) {
                res.json({
                    server : false,
                    message : "no list found",
                    err
                })
            } else {
              if(results.length === 0){
                res.json({
                    message : "items not found",
                
                })
              }
              else{
                res.json({
                    message : "items found succesfully",
                    results
                })
              }
            }
        })

    } catch (error) {
        res.json({
            message : "invalid list",
            error
        })
    }
});

food.post("/create/", (req, res)=>{
    try {
        const id = Math.floor(10000000 * Math.random() + 9999999);
        const name = req.body.food_name;
        const type = req.body.food_type;
        const amount = req.body.food_amount;
        const description = req.body.food_description;
        const status = req.body.food_status;
        const ifdeleted = req.body.food_ifdeleted;
    
    let createSql = `INSERT INTO food_items(food_id, food_name, food_type, food_amount, food_description, food_status, food_ifdeleted)
                     VALUES ('${id}', '${name}', '${type}', '${amount}', '${description}', '${status}', '${ifdeleted}' )`;
    
        database.query(createSql, (error, results)=>{
            if(error){
                res.json({
                    server : false,
                    message : "item not created",
                    error
                })
            }
            else{
                res.json({
                    server : true,
                    message : "item created succesfully",
                    results
                })
            }
        })

    } catch (error) {
        res.json({
            message : "invalid details",
            error
        })
    }
});

food.put("/update/", (req, res)=>{
    try {
        const id = req.body.food_id;
        const name = req.body.food_name;
        const type = req.body.food_type;
        const amount = req.body.food_amount;
        const description = req.body.food_description;
        const status = req.body.food_status;
        const ifdeleted = req.body.food_ifdeleted; 

        exSql = `SELECT * FROM food_items WHERE food_id = '${id}'`;

        database.query(exSql, (error, results)=>{
            if(error){
                res.json({
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
                        res.json({
                            message : "item not updated",
                            error
                        })
                    }
                    else{
                        res.json({
                            mesage : "item updated succesfully",
                            results
                        })
                    }
                })
            }
        })
    } catch (error) {
        res.json({
            message : "invalid id",
            error
        })
    }
});

food.delete("/remove/:food_id", (req, res)=>{
    try {
        let id = req.params.food_id;

        const checkSql = `SELECT * FROM food_items WHERE food_id = '${id}'`;

        database.query(checkSql, (error, results)=>{
            if (error) {
                res.json({
                    message : "item not found",
                    error
                })
            } else {
                
                const deleteSql = `DELETE FROM food_items WHERE food_id = '${id}'`;
            
                database.query(deleteSql, (error, results)=>{
                    if (error) {
                        res.json({
                            mesage : "item not deleted",
                            error
                        })
                    } else {
                        res.json({
                            message : "item deleted succesfully"
                        })
                    }
                })
                   
            }
        })
    } catch (error) {
        res.json({
            mesage : "you have entered invalid item id",
            error
        })
    }
});

module.exports = food;