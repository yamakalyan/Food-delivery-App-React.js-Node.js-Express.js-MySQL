const express = require("express");
const jwl = require("jsonwebtoken");
const database = require("../configures/database");

const db = require("../configures/database");

const orders = express.Router();

// home page of orders page 
orders.get("/", (req, res)=>{
    try {
        res.status(200).json({
            server : true,
            message : "orders data is working"
        })
    } catch (error) {
        res.status(500).json({
            server : false,
            message : "orders data is not working",
            error
        })
    }
});

orders.get("/list/", (req, res)=>{
    try {
        
    const sql = `SELECT * FROM user_orders WHERE order_ifdeleted ='0'`;

    database.query(sql, (err, results)=>{
        if (err) {
            res.status(400).json({
                sever : false,
                msg : 'wrong details',
                err
            })
        } else {
            if (results.length != 0) {
                res.status(200).json({
                    server :true,
                    msg : "orders lists found",
                    results
                })
            } else {
                res.status(400).json({
                    server : false,
                    msg : 'no lists are found'
                })
            }
        }
    })
    } catch (error) {
        res.status(500).json({
            server: false,
            error
        })
    }

})
// to create order for user
orders.post("/create/", (req, res)=>{
    try {
        const orderId = Math.floor(10000000 + Math.random() *9999999);
        const orderQuantity = req.body.order_quantity;
        const userId = req.body.user_id;
        const foodId = req.body.food_id;
        const addressId = req.body.address_id;
        const orderAmount = req.body.order_amount;
        const orderStatus = req.body.order_status;
        const orderIfdeleted = req.body.order_ifdeleted;
        const jwlheader = process.env.JWT_HEADER_KEY
        const jwlsecurekey = process.env.JWT_SECRET_KEY

        const headerJwlkey = req.header(jwlheader);
        const verify = jwl.verify(headerJwlkey, jwlsecurekey)

        if (verify) {

    const sql = `INSERT INTO user_orders(order_id, order_quantity, user_id, food_id, address_id, order_amount, order_status, order_ifdeleted)
                VALUES ('${orderId}', '${orderQuantity}', '${userId}', '${foodId}', '${addressId}', '${orderAmount}', '${orderStatus}', '${orderIfdeleted}')`;

                db.query(sql, (err, results)=>{
                    if(err){
                        res.status(400).json({
                            server : false,
                            message : "order was not created",
                            err
                        })
                    }
                    else{
                        res.status(200).json({
                            server : true,
                            message : "order saved succesfully",
                            results
                        })
                    }
                })
                
        } else {
            res.status(401).json({
                server :false,
                 msg : "order not created"
            }) 
         }
    } catch (error) {
        res.status(500).json({
            server :false,
            message : "invalid order detailes",
            error
        })
    }
});

// to get user details, food details, by order id
orders.get("/orderdetails/:order_id/", (req, res)=>{
    try {
        const searchingOrder = req.params.order_id;

        const orderSql = `SELECT * FROM user_orders WHERE order_id = '${searchingOrder}' AND order_ifdeleted ='0'`;

        db.query(orderSql, (error, orderResults)=>{
            if (error) {
                res.status(400).json({
                    server :false,
                    message : "order not found",
                    error
                })
            } else {
                const fromresultgettingFooddetails = orderResults[0].food_id;
                const fromresultgettingUserdetails = orderResults[0].user_id;
                
                const foodSQl = `SELECT * FROM food_items WHERE food_id = '${fromresultgettingFooddetails}'`;

                db.query(foodSQl, (error, foodResults)=>{
                    if (error) {
                        res.status(400).json({
                            sever : false,
                            message :  "order id found. but food id not matched",
                            error
                        })
                    } else {
                        const userSql = `SELECT * FROM users_data WHERE user_id = '${fromresultgettingUserdetails}'`;

                        db.query(userSql, (error, userResults)=>{
                            if (error) {
                                res.status(400).json({
                                    server :false,
                                    message :  "order id, food id matched but user not found",
                                    error
                                })
                            } else {
                                res.status(200).json({
                                    server :true,
                                    message : "data found succesfully",
                                    orderResults,
                                    foodResults,
                                    userResults

                                })
                            }
                        })
                    }
                })
            }
        })
    } catch (error) {
        res.status(500).json({
            server : false,
            message :  'invalid details',
            error
        })
    }
});

// getting user ordered food items
orders.get("/orderlist/:user_id", (req, res)=>{
    try {
        const userId = req.params.user_id;

        let listQuerrysql = `SELECT * FROM user_orders WHERE user_id = '${userId}' AND order_ifdeleted ='0'`;

        db.query(listQuerrysql, (err, results)=>{
            if (err) {
                res.status(400).json({
                    server: false,
                    message : "user orders not found",
                    err
                })
            } else {
                res.status(200).json({
                    server : true,
                    message :'order found',
                    results
                })
            }
        })
    } catch (error) {
        res.status(500).json({
            server : false,
            message : "invalid user id",
            error
        })
    }
})

// update for user orders
orders.put("/update/:user_id", (req, res)=>{
    try {
        const id = req.params.user_id;
        const orderQuantity = req.body.order_quantity;
        const foodId = req.body.food_id;
        const addressId = req.body.address_id;
        const orderAmount = req.body.order_amount;
        const orderStatus = req.body.order_status;
        const orderIfdeleted = req.body.order_ifdeleted;
        const jwlheaderkey = process.env.JWT_HEADER_KEY;
        const jwlsecurekey = process.env.JWT_SECRET_KEY;

        const header = req.header(jwlheaderkey);
        const verified = jwl.verify(header, jwlsecurekey);

        if (verified) {
    
        const checkingSql = `SELECT * FROM user_orders WHERE order_id = '${id}' AND order_ifdeleted = '0'`;

        db.query(checkingSql, (error, results)=>{
            if (error) {
                res.status(400).json({
                    server : false,
                    message : "order not found",
                    error
                })
            } else {
                if(results.length === 0){
                    res.status(400).json({
                        server : false,
                        message : "order not found"
                    })
                }
                else{
                    const updateSql = `UPDATE user_orders
                     SET 
                     order_quantity = '${orderQuantity}', 
                     food_id = '${foodId}',
                     address_id = '${addressId}',
                     order_amount = '${orderAmount}',
                     order_status = '${orderStatus}',
                     order_ifdeleted = '${orderIfdeleted}'
                     WHERE order_id = '${id}' AND order_ifdeleted = '0'`;
                    db.query(updateSql, (error, results)=>{
                        if (error) {
                            res.status(401).json({
                                server : false,
                                message : "order not found",
                                error
                            })
                        } 
                        else{
                            res.status(200).json({
                                server : true,
                                message : "order modified succesfully",
                                results

                            })
                        }
                    })
                }
            }
        })
                
    } else {
         res.status(404).json({
            server : false,
            msg : "update failed"
         })   
    }

    } catch (error) {
        res.status(500).json({
            server : false,
            message : "invalid order id",
            error
        })
    }
});

// to delete user orders
orders.delete("/delete/:order_id/", (req, res)=>{
    try {
        const id = req.params.order_id;

        const checkingSql = `SELECT * FROM user_orders WHERE order_id = '${id}' AND order_ifdeleted ='0'`;

        db.query(checkingSql, (error, results)=>{
            if (error) {
                res.status(400).json({
                    server : false,
                    message : "order not found",
                    error
                })
            } else {
                if(results.length === 0){
                    res.status(400).json({
                        server : false,
                        message : "order not found"
                    })
                }
                else{
                    const deleteSql = `UPDATE user_orders SET order_ifdeleted ='1' WHERE order_id = '${id}' AND order_ifdeleted ='0'`;

                    db.query(deleteSql, (error, results)=>{
                        if (error) {
                            res.status(400).json({
                                server : false,
                                message : "order was not deleted",
                                error
                            })
                        } 
                        else{
                            res.status(200).json({
                                server : true,
                                message : "order deleted succesfully",

                            })
                        }
                    })
                }
            }
        })
    }  catch (error) {
        res.status(500).json({
            server : false,
            message : "order was not found",
            error
        })
    }
});

orders.get("/userorders/:user_id/", (req, res)=>{
    try {
        let id = req.params.user_id;

        let sql = `SELECT * FROM user_orders WHERE user_id = '${id}' AND order_ifdeleted ='0' `;

        db.query(sql,(err, orderResults)=>{
            if (err) {
                res.status(400).json({
                    server : false,
                    message : "orders not found",
                    err
                })
            } else {
                if (orderResults.length === 0) {
                    res.status(400).json({
                        server : false,
                        mesage : "there are no orders"
                    })
                } else {
              
                // var takingfoodid = orderResults[0].food_id

                for (let i = 0; i < orderResults.length; i++) {
                    // console.log(orderResults[i].food_id)
                    
                    const takingfoodid = orderResults[i].food_id;

                    if (takingfoodid != 0 ) {
                        const foodQuery = `SELECT * FROM food_items WHERE food_id IN (?) AND food_ifdeleted = '0'`;

                        database.query(foodQuery, [takingfoodid], (err, foodResults)=>{
                            if (err) {
                            
                                console.log(err)
                                
                            } else {
                                res.status(200).json({
                                server : false,
                                msg : "items found succesfully",
                                orderResults,
                                foodResults
                            }) 
                            }
                        })
                    } else {
                        res.status(400).json({
                            server : false,
                            msg : "food items not found"
                        })
                    }
                }
                
                }
            }
        })
    } catch (error) {
        res.status(500).json({
            server : false,
            message : "invalid info",
            error
        })
    }
})
module.exports = orders;