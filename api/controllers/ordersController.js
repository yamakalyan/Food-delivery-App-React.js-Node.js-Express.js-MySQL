const express = require("express");
const jwl = require("jsonwebtoken");
const database = require("../configures/database");

const db = require("../configures/database");

const orders = express.Router();

// HOME PAGE OF ORDERS PAGE
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

// JUST SIMPLY PURPOSR LIST OF WHOLE ORDERS IN DATABASE
orders.get("/list/", (req, res)=>{
    try {
        
    const sql = `SELECT * FROM user_orders WHERE order_ifdeleted ='0'`;

    database.query(sql, async(err, results)=>{
        if (err) {
            res.status(400).json({
                sever : false,
                msg : 'wrong details',
                err
            })
        } else {
            if (results.length != 0) {
                await res.status(200).json({
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

});

// CREATING ORDER
orders.post("/create", (req, res)=>{
    try {
        const orderId = Math.floor(10000000 + Math.random() *9999999);
        const orderTime = new Date()
        const foodId = req.body.food_id;
        const addressId = req.body.address_id;
        const orderStatus = req.body.order_status;

        const jwlheader = process.env.JWT_HEADER_KEY
        const jwlsecurekey = process.env.JWT_SECRET_KEY

        const headerJwlkey = req.header(jwlheader);
        const verify = jwl.verify(headerJwlkey, jwlsecurekey)

        if (verify) {

            const userId = verify.user_id

    const sql = `INSERT INTO user_orders(order_id, order_time, user_id, food_id, order_quantity, tax, charges, address_id, order_status, order_ifdeleted)
                VALUES ('${orderId}', '${orderTime}', '${userId}', '${foodId}', '1','13', '20', '${addressId}', '${orderStatus}', '0')`;

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
                 msg : "user not verified"
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

// GETTING WHOLE ORDERING DETAILS WITH USER ID
orders.get("/orderdetails", (req, res)=>{
    try {
        const headerKEy = process.env.JWT_HEADER_KEY;
        const secureKey = process.env.JWT_SECRET_KEY

        const header = req.header(headerKEy)
        const verify = jwl.verify(header, secureKey)
        if (verify) {
            
            const foodDetails= async(fromresultgettingFooddetails)=>{
            return new Promise((resolve, reject)=>{
            const foodSQl = `SELECT * FROM food_items WHERE food_id = '${fromresultgettingFooddetails}'`;
            
            db.query(foodSQl, (error, food)=>{
                if (error) {
                   reject(error)
                }else{
                    resolve(food)
                }
            
                })
            })
        }
            const addressDetails = async(fromresultgettingAddressdetails)=>{
            return new Promise((resolve, reject)=>{
            const foodSQl = `SELECT * FROM users_address WHERE address_id = '${fromresultgettingAddressdetails}'`;
            
            db.query(foodSQl, (error, address)=>{
                if (error) {
                   reject(error)
                }else{
                    resolve(address)
                }
            
                })
            })
        }

            const TotalAmount = async(amount, foodId, quantityId)=>{
                return new Promise((resolve, reject)=>{
                    const totalSql = `SELECT SUM(order_quantity * '${amount}' + tax + charges) as Total FROM user_orders
                      WHERE food_id= '${foodId}' AND order_status='0' `
                    database.query(totalSql, (err, Total)=>{
                        if (err) {
                            reject(err)
                        } else {
                            resolve(Total)
                        }
                    })
                })
            }
        const userID = verify.user_id
        
        const orderSql = `SELECT * FROM user_orders WHERE user_id = '${userID}' AND order_status ='0'`;

        db.query(orderSql, async(error, orderResults)=>{
            if (error) {
                res.status(400).json({
                    server :false,
                    message : "order not found",
                    error
                })
            } else {
                for(let i = 0; i < orderResults.length; i++){

                    const fromresultgettingFooddetails = orderResults[i].food_id
                    const fromresultgettingAddressdetails = orderResults[i].address_id
                    orderResults[i].food = await foodDetails(fromresultgettingFooddetails)
                    orderResults[i].address = await addressDetails(fromresultgettingAddressdetails)
                    const amount = orderResults[i].food[0].food_amount
                    const foodId = orderResults[i].food_id
                    orderResults[i].Total = await TotalAmount(amount, foodId)
                }
                res.status(200).json({
                    server :true,
                    message : "order found succesfully",
                    orderResults
                })
            }
        })
    } else{
        res.status(400).json({
            server : false,
            message : "token not verified"
        })
    }
    } catch (error) {
        res.status(500).json({
            server : false,
            message :  'invalid details',
            error
        })
    }
});

// GETTING THE WHOLE SUCCESS ORDERS OF USER ORDERED FOOD
orders.get("/orderlist", (req, res)=>{
    try {

        let tokenHeader = process.env.JWT_HEADER_KEY
        let secureKEy = process.env.JWT_SECRET_KEY

        const token = req.header(tokenHeader)
        const verifiyingToken = jwl.verify(token, secureKEy)

        if (verifiyingToken) {
            
            let userId = verifiyingToken.user_id;
// its mandatory to write resolve first its fixed method i guess, otherwise we get error if we try reject frist resolve next
            const fetchingFoodDetails = async (foodId)=>{
                return new Promise ((resolve, reject)=>{
                const foodQuery = `SELECT * FROM food_items WHERE food_id ='${foodId}'`;
                database.query(foodQuery, (error, foodResults)=>{
                    if (error) {
                        reject(error)
                    } else {
                        resolve(foodResults)
                    }
                })
                })
            }
            
            const fetchingaddressDetails = async (addressId)=>{
                return new Promise((resolve, reject)=>{
                    const addressQuery = `SELECT * FROM users_address  WHERE address_id = '${addressId}'`
                    database.query(addressQuery, (error, addressResults)=>{
                        if (error) {
                            reject(error)
                        } else {
                            resolve(addressResults)
                        }
                    })
                })
            }

            let listQuerrysql = `SELECT * FROM user_orders WHERE user_id ='${userId}' AND order_status ='1'`;
    
            db.query(listQuerrysql, async (err, results)=>{
                if (err) {
                    res.status(400).json({
                        server: false,
                        message : "user orders not found",
                        err
                    })
                } else {
                if (results.length === 0) {
                    res.status(400).json({
                        server : false,
                        message : 'user orders not found'
                    })
                } else {
                    for(var i = 0; i < results.length; i++){
                        const foodId = results[i].food_id
                        const addressId = results[i].address_id
                        results[i].foodResults = await fetchingFoodDetails(foodId)
                        results[i].addressResults = await fetchingaddressDetails(addressId)
                    }
                res.json({
                    server : true,
                    results
                })

                }
                }
            })
        } else {
            res.status(400).json({
                server : false,
                message :'user not verified to show orders',
            })
        }

    } catch (error) {
        res.status(500).json({
            server : false,
            message : "invalid user id",
            error
        })
    }
})

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

module.exports = orders;