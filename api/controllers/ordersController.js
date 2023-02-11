const express = require("express");

const db = require("../configures/database");

const orders = express.Router();

// home page of orders page 
orders.get("/", (req, res)=>{
    try {
        res.json({
            server : true,
            message : "orders data is working"
        })
    } catch (error) {
        res.json({
            server : false,
            message : "orders data is not working",
            error
        })
    }
});

// searching food item by using routing method
orders.get("/search/:food_id/", (req, res)=>{
    try {
        const id = req.params.food_id;

        const checkingSql = `SELECT * FROM food_items WHERE food_id = '${id}'`;

        db.query(checkingSql, (error, results)=>{
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

    const sql = `INSERT INTO user_orders(order_id, order_quantity, user_id, food_id, address_id, order_amount, order_status, order_ifdeleted)
                VALUES ('${orderId}', '${orderQuantity}', '${userId}', '${foodId}', '${addressId}', '${orderAmount}', '${orderStatus}', '${orderIfdeleted}')`;

                db.query(sql, (err, results)=>{
                    if(err){
                        res.json({
                            message : "order was not created",
                            err
                        })
                    }
                    else{
                        res.json({
                            message : "order saved succesfully",
                            results
                        })
                    }
                })
    } catch (error) {
        res.json({
            message : "invalid order detailes",
            error
        })
    }
});

// adding user_id automatically when we order food
orders.post("/create/:user_id/",(req, res)=>{
    try {
        const orderId = Math.floor(10000000 + Math.random() *9999999);
        const orderQuantity = req.body.order_quantity;
        const userid = req.params.user_id;
        const foodId = req.body.food_id;
        const addressId = req.body.address_id;
        const orderAmount = req.body.order_amount;
        const orderStatus = req.body.order_status;
        const orderIfdeleted = req.body.order_ifdeleted;

        

        let sql = `SELECT user_id FROM users_data WHERE user_id = '${userid}'`;

        db.query(sql, (error, results)=>{
            if (error) {
                res.json({
                    mesage : "id not found",
                    error
                })
            } else {
                var userResult = results[0].user_id;

                const creatingSql = `INSERT INTO user_orders(order_id, order_quantity, user_id, food_id, address_id, order_amount, order_status, order_ifdeleted)
                VALUES ('${orderId}', '${orderQuantity}', '${userResult}', '${foodId}', '${addressId}' '${orderAmount}', '${orderStatus}', '${orderIfdeleted}')`;

                db.query(creatingSql, (error, results)=>{
                    if (error) {
                        res.json({
                            message : "unable to create order",
                            error
                        })
                    } else {
                        res.json({
                            message : "order succesfully created",
                            results
                        })
                    }
                })

            }
        })
    } catch (error) {
        res.json({
            mesage : "invalid data",
            error
        })
    }
});

// to get user details, food details, by order id
orders.get("/userdetails/:order_id/", (req, res)=>{
    try {
        const searchingOrder = req.params.order_id;

        const orderSql = `SELECT * FROM user_orders WHERE order_id = '${searchingOrder}'`;

        db.query(orderSql, (error, orderResults)=>{
            if (error) {
                res.json({
                    message : "order not found",
                    error
                })
            } else {
                const fromresultgettingFooddetails = orderResults[0].food_id;
                const fromresultgettingUserdetails = orderResults[0].user_id;
                
                const foodSQl = `SELECT * FROM food_items WHERE food_id = '${fromresultgettingFooddetails}'`;

                db.query(foodSQl, (error, foodResults)=>{
                    if (error) {
                        res.json({
                            message :  "order id found. but food id not matched",
                            error
                        })
                    } else {
                        const userSql = `SELECT * FROM users_data WHERE user_id = '${fromresultgettingUserdetails}'`;

                        db.query(userSql, (error, userResults)=>{
                            if (error) {
                                res.json({
                                    message :  "order id, food id matched but user not found",
                                    error
                                })
                            } else {
                                res.json({
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
        
    }
});

// getting user ordered food items

orders.get("/userorders/:user_id/", (req, res)=>{
    try {
        const userid = req.params.user_id;

        const gettingSql = `SELECT * FROM user_orders WHERE user_id = '${userid}'`;

        db.query(gettingSql, (err, orderResults)=>{
            if (err) {
                res.json({
                    message : "orders not found",
                    err
                })
            } else {

             var obj = orderResults[2].food_id

                const foodSql = `SELECT * FROM food_items WHERE food_id = '${obj}'`;

                db.query(foodSql, (error, foodResults)=>{
                    if (error) {
                        res.json({
                            message : "orders found but fetching food details failed",
                            error
                        })
                    } else {
                      res.json({
                        orderResults,
                        foodResults
                      })
                    }
                })
            }
        })
    } catch (error) {
        res.json({
            message : "invalid user details",
            error
        })
    }
});

// update for user previous orders
orders.put("/update/:order_id/", (req, res)=>{
    try {
        const id = req.params.order_id;
        const orderQuantity = req.body.order_quantity;
        const foodId = req.body.food_id;
        const addressId = req.body.address_id;
        const orderAmount = req.body.order_amount;
        const orderStatus = req.body.order_status;
        const orderIfdeleted = req.body.order_ifdeleted;

        const checkingSql = `SELECT * FROM user_orders WHERE order_id = '${id}'`;

        db.query(checkingSql, (error, results)=>{
            if (error) {
                res.json({
                    message : "order not found",
                    error
                })
            } else {
                if(results.length === 0){
                    res.json({
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
                     WHERE order_id = '${id}'`;
                    db.query(updateSql, (error, results)=>{
                        if (error) {
                            res.json({
                                message : "order not found",
                                error
                            })
                        } 
                        else{
                            res.json({
                                message : "order modified succesfully",
                                results

                            })
                        }
                    })
                }
            }
        })
    } catch (error) {
        res.json({
            message : "invalid order id",
            error
        })
    }
});

// to delete user orders
orders.delete("/delete/:order_id/", (req, res)=>{
    try {
        const id = req.params.order_id;

        const checkingSql = `SELECT * FROM user_orders WHERE order_id = '${id}'`;

        db.query(checkingSql, (error, results)=>{
            if (error) {
                res.json({
                    message : "order not found",
                    error
                })
            } else {
                if(results.length === 0){
                    res.json({
                        message : "order not found"
                    })
                }
                else{
                    const deleteSql = `DELETE FROM user_orders WHERE order_id = '${id}'`;

                    db.query(deleteSql, (error, results)=>{
                        if (error) {
                            res.json({
                                message : "order was not deleted",
                                error
                            })
                        } 
                        else{
                            res.json({
                                message : "order deleted succesfully",

                            })
                        }
                    })
                }
            }
        })
    }  catch (error) {
        res.json({
            message : "order was not found",
            error
        })
    }
});


module.exports = orders;