const express = require("express");

const database = require("../configures/database")

const payments = express.Router();

// home page of payments
payments.get("/", (req, res)=>{
    try {
        res.send("succesfully payment working")
        
    } catch (error) {
        res.send("failed to connect payments")
    }
});

// for creating payment
payments.post("/create/", (req, res)=>{
    try {
        const paymentId = Math.floor(1000000 + Math.random() * 99999999);
        const userId = req.body.user_id	;
        const orderId = req.body.order_id;
        const paymentDetails = req.body.payment_details;
        const totalAmount = req.body.total_amount;
        const paymentStatus = req.body.payment_status;
        const paymentIffailed = req.body.payment_iffailed;

        var paymentsql = `INSERT INTO payments(payment_id,user_id,order_id,payment_details,total_amount,payment_status,payment_iffailed)
                    VALUES('${paymentId}','${userId}','${orderId}','${paymentDetails}','${totalAmount}','${paymentStatus}','${paymentIffailed}')`;

            database.query(paymentsql, (err, results)=>{
                if (err) {
                    res.json({
                        message : "failed to create payment",
                        err
                    })
                } else {
                    res.json({
                        message : "payment succesfully created",
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

// for deleting payment
payments.delete("/delete/:payment_id", (req, res)=>{
    try {
        const id = req.params.payment_id;

        const sql = `SELECT * FROM payments WHERE payment_id = '${id}'`;

        database.query(sql, (error, results)=>{
            if (error) {
                res.json({
                    message : "payment failed to delete",
                    error
                })
            } else {
            
                if(results.length === 0){
                    res.json({
                        message : "payment not found",
                    
                    })
                }
                else{
                    const deleteSql = `DELETE FROM payments WHERE payment_id = '${id}'`;

                    database.query(deleteSql, (err, results)=>{
                        if (err) {
                            res.json({
                                message : "payment not deleted",
                                err
                            })
                        } else {
                            res.json({
                                message : "payment deleted succesfully"
                            })
                        }
                    })
                }
            }
        })
    } catch (error) {
        res.json({
            message : "invalid details entered",
            error 
        })
    }
});

// searching payment/order details/food details/address/user details
payments.get("/details/:payment_id", (req, res)=>{
    try {
        const paymentId = req.params.payment_id

        const checkingQuerry = `SELECT * FROM payments WHERE payment_id = '${paymentId}'`;

        database.query(checkingQuerry, (error, paymentResult)=>{
            if (error) {
                res.json({
                    message : "payment not found",
                    error
                })
            } else {
                if(paymentResult.length === 0){
                    res.json({
                        message : "not found"
                    })
                }
                else{
                    
                   var takingPaymentdetails = paymentResult[0].order_id;

                   const ordersQuerry = `SELECT * FROM user_orders WHERE order_id = '${takingPaymentdetails}'`;

                   database.query(ordersQuerry, (err, orderResults)=>{
                    if (err) {
                        res.json({
                            message : "payment order didnt found",
                            err
                        })
                    } else {
                        if(orderResults.length === 0){
                            res.json({
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
                                    res.json({
                                        message : "food item not found",
                                        err
                                    })
                                } else {
                                    if(foodResults.length === 0){
                                        res.json({
                                            message : "order found but food details not found"
                                        })
                                    }
                                    else{
                                        const addressQuerry = `SELECT * FROM users_address WHERE address_id = '${takingaddressdetails}'`;
                                        database.query(addressQuerry, (err, addressResults)=>{
                                            if (err) {
                                                res.json({
                                                    message : "address not found",
                                                    err
                                                })
                                            } else {
                                                if(addressResults.length === 0){
                                                    res.json({
                                                        message : "food found but address details not found"
                                                    })
                                                }
                                                else{
                                                    const userQuerry = `SELECT * FROM users_data WHERE user_id = '${takingUserdetails}'`;
                                                    database.query(userQuerry, (err, userResults)=>{
                                                        if (err) {
                                                            res.json({
                                                                message : "user not found",
                                                                err
                                                            })
                                                        } else {
                                                            if(userResults.length === 0){
                                                                res.json({
                                                                    message : "address found but user details not found"
                                                                })
                                                            }
                                                            else{
                                                                res.json({
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
    } catch (error) {
        res.json({
            message : "invalid details",
            error
        })
       
    }
})

module.exports = payments;