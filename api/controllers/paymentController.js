const express = require("express");
const jwl = require("jsonwebtoken");
const database = require("../configures/database")
const crypto = require('crypto')
const payments = express.Router();
const Razorpay = require("razorpay");

const instance = new Razorpay({
    key_id : process.env.Razor_key_id,
    key_secret : process.env.Razor_secret_key
})

// HOME PAGE OF PAYMENT
payments.get("/", (req, res)=>{
    try {
        res.status(200).send("succesfully payment working")
        
    } catch (error) {
        res.status(500).send("failed to connect payments")
    }
});

// CREATE PAYMENT
payments.post('/create', (req, res)=>{
    try {
       const options = {
        amount : req.body.amount * 100,
        currency : req.body.currency,
        receipt : Math.floor(100000 * Math.random() + 999999),
        notes : {
            order_id : req.body.order_id,
            food_name : req.body.food_name
        }
       }
       const headerkey = process.env.JWT_HEADER_KEY
       const securekey = process.env.JWT_SECRET_KEY
       const header = req.header(headerkey)
       const verified = jwl.verify(header, securekey)

       if (verified) {
        const userId = verified.user_id
      instance.orders.create(options, (err, results)=>{
        if (err) {
            res.status(400).json({
                server : false,
                message : 'payment creation failed',
                err
            })
        } else {
            var creatingPayment = `INSERT INTO payments(razorpay_payment_id, razorpay_order_id, user_id, razorpay_signature, order_id, amount, payment_status)
            VALUES ('','${results.id}', '${userId}', '', '${req.body.order_id}', '${results.amount /100}', '0')`

            database.query(creatingPayment, (err, paymentResults)=>{
                if (err) {
                    res.status(400).json({
                        server : false,
                        message : "payment created but not added to database",
                        err
                    })
                } else {
                    const sendingValues = {
                        payorder_id : results.id,
                        amount : results.amount,
                        server : true
                    }
                    res.status(200).json({
                        server : true,
                        message : "payment created succesfully",
                        sendingValues
                    })
                }
            })
        }
      })
              
    } else {
        res.json({
            server : false,
            message : 'token verify failed'
        })  
    }
    } catch (error) {
        res.json({
            server : false,
            error
        })
    }
})

payments.put('/success/verify', (req, res)=>{
    try {
        const orderIdofFood = req.body.order_food_id;
        const razorpay_order_id = req.body.order_id;
        const razorpay_payment_id = req.body.razorpay_payment_id
        const razorpay_signiture = req.headers['x-razorpay-signature']
        
        const hmc = crypto.createHmac('sha256', process.env.Razor_secret_key);
        hmc.update( razorpay_order_id + '|' + razorpay_payment_id);
        const generated_signature = hmc.digest('hex');

        if (razorpay_signiture === generated_signature) {

    const updateQuery = `UPDATE payments SET razorpay_signature='${razorpay_signiture}', razorpay_payment_id ='${razorpay_payment_id}', payment_status='1' WHERE razorpay_order_id = '${razorpay_order_id}'`
    database.query(updateQuery, (err, results)=>{
        if (err) {
            res.status(400).json({
                server :false,
                message : "verified but not added to database",
                err
            })
        } else {
            const updateQuery = `UPDATE user_orders SET order_status= '1' WHERE order_id='${orderIdofFood}'`
            database.query(updateQuery, (err, updateResults)=>{
                if (err) {
                    res.status(400).json({
                        server : false,
                        message : 'failed to update status',
                        err
                    })
                } else {
                    res.status(200).json({
                        server : true,
                        message : "succesfully verified details",
                        results,
                        updateResults
                        
                    })
                }
            })
        }
    })

        }else{
            res.json({
                server : false,
                message :'payment failude'
            })
        }
    } catch (error) {
        res.status(500).json({
            server : false,
            error
        })
    }
})

// GETTING WHOLE DETAILS WITH PAYMENT ID
payments.get("/details", (req, res)=>{
    try {
        const headerKey = process.env.JWT_HEADER_KEY
        const secureKey = process.env.JWT_SECRET_KEY
        const header = req.header(headerKey)
        const verified = jwl.verify(header, secureKey)
        if (verified) {
            const userID = verified.user_id

        const checkingQuerry = `SELECT * FROM payments WHERE user_id = '${userID}'`;

        database.query(checkingQuerry, (error, paymentResult)=>{
            if (error) {
                res.status(400).json({
                    server : false,
                    message : "payment not found",
                    error
                })
            } else {
                if(paymentResult.length === 0){
                    res.status(400).json({
                        server : false,
                        message : "not found"
                    })
                }
                else{
                    
                   var takingPaymentdetails = paymentResult[0].order_id;

                   const ordersQuerry = `SELECT * FROM user_orders WHERE order_id = '${takingPaymentdetails}' AND order_status='0'`;

                   database.query(ordersQuerry, (err, orderResults)=>{
                    if (err) {
                        res.status(400).json({
                            server : false,
                            message : "payment order didnt found",
                            err
                        })
                    } else {
                        if(orderResults.length === 0){
                            res.status(400).json({
                                server : false,
                                message : "payment found but order details not found"
                            })
                        }
                        else{
                           
                            const takingOrderdetails = orderResults[0].food_id;
                            const takingaddressdetails = orderResults[0].address_id;
                            const takingUserdetails = orderResults[0].user_id;

                            const foodQuerry = `SELECT * FROM food_items WHERE food_id = '${takingOrderdetails}'`;
                            database.query(foodQuerry, (err, foodResults)=>{
                                if (err) {
                                    res.status(400).json({
                                        server : false,
                                        message : "food item not found",
                                        err
                                    })
                                } else {
                                    if(foodResults.length === 0){
                                        res.status(400).json({
                                            server : false,
                                            message : "order found but food details not found"
                                        })
                                    }
                                    else{
                                        const addressQuerry = `SELECT * FROM users_address WHERE address_id = '${takingaddressdetails}'`;
                                        database.query(addressQuerry, (err, addressResults)=>{
                                            if (err) {
                                                res.status(400).json({
                                                    server : false,
                                                    message : "address not found",
                                                    err
                                                })
                                            } else {
                                                if(addressResults.length === 0){
                                                    res.status(400).json({
                                                        server : false,
                                                        message : "food found but address details not found"
                                                    })
                                                }
                                                else{
                                                    const userQuerry = `SELECT * FROM users_data WHERE user_id = '${takingUserdetails}'`;
                                                    database.query(userQuerry, (err, userResults)=>{
                                                        if (err) {
                                                            res.status(400).json({
                                                                server : false,
                                                                message : "user not found",
                                                                err
                                                            })
                                                        } else {
                                                            if(userResults.length === 0){
                                                                res.status(400).json({
                                                                    server : false,
                                                                    message : "address found but user details not found"
                                                                })
                                                            }
                                                            else{
                                                                res.status(200).json({
                                                                    server : true,
                                                                    message : "Payment Details Found Succesfully",
                                                                    paymentResult,
                                                                    orderResults,
                                                                    foodResults,
                                                                    addressResults,
                                                                    userResults
                                                                })
                                                            }
                                                            
                                                        }
                                                    })
                                                }
                                                
                                            }
                                        })
                                    }
                                    
                                }
                            })
                        }
                    }
                   })
                }
            }
        })
    } else {
          res.status(400).json({
            server : false,
            message : "User not verified"
          })  
    }
    } catch (error) {
        res.status(500).json({
            server : false,
            message : "invalid details",
            error
        })
       
    }
})

module.exports = payments;