const express = require('express')

const database = require('../configures/database')
const jwl = require('jsonwebtoken')
const cart = express.Router();

// GET CART
cart.get('/', (req, res)=>{
    try {
        const headerKey = process.env.JWT_HEADER_KEY
        const secureKey = process.env.JWT_SECRET_KEY

        const header = req.header(headerKey)
        const verified = jwl.verify(header, secureKey)

        if (verified) {
            const foodResultsfromCart = async (foodId)=>{
                return new Promise((resolve, reject)=>{
                    const foodSql = `SELECT * FROM food_items WHERE food_id ='${foodId}' `;
                    database.query(foodSql, (err, foodDetails)=>{
                        if (err) {
                            reject(err)
                        } else {
                            resolve(foodDetails)
                        }
                    })
                })
            }

        let userID = verified.user_id

        let checkingSql = `SELECT * FROM user_cart WHERE user_id = '${userID}' AND cart_quantity != '0' `;

        database.query(checkingSql, async (err, results)=>{
            if (err) {
                res.status(400).json({
                    server : false,
                    message : 'technical issues',
                    err
                })
            } else {
                if (results.length === 0) {
                    res.status(400).json({
                        server : false,
                        message : 'Cart is Empty'
                    })
                } else {  
                        for (let i = 0; i < results.length; i++) {
                         let foodId = results[i].cart_food_id;
                         results[i].foodDetails = await foodResultsfromCart(foodId)
                            
                        }
                        res.status(200).json({
                            server : true,
                            message : 'Added to cart',
                            results
                        })
                }
            }
        })
    } else {
    res.status(400).json({
                server : false,
                message : 'user not verified'
            })   
    }
    } catch (error) {
        res.status(500).json({
            server : false,
            message : 'invalid info',
            error
        })
        
    }
})
// GETTING LIST WITH CART ID
cart.get('/cart/:cart_id', (req, res)=>{
    try {
        const cartId = req.params.cart_id
        const headerKey = process.env.JWT_HEADER_KEY
        const secureKey = process.env.JWT_SECRET_KEY

        const header = req.header(headerKey)
        const verified = jwl.verify(header, secureKey)

        if (verified) {

        let userID = verified.user_id

        let checkingSql = `SELECT * FROM user_cart WHERE user_id = '${userID}' AND cart_id = '${cartId}' `;

        database.query(checkingSql, (err, results)=>{
            if (err) {
                res.status(400).json({
                    server : false,
                    message : 'technical issues',
                    err
                })
            } else {
                if (results.length === 0) {
                    res.status(400).json({
                        server : false,
                        message : 'Cart is Empty'
                    })
                } else {  
                        res.status(200).json({
                            server : true,
                            message : 'cart',
                            results
                        })
                }
            }
        })
    } else {
    res.status(400).json({
                server : false,
                message : 'user not verified'
            })   
    }
    } catch (error) {
        res.status(500).json({
            server : false,
            message : 'invalid info',
            error
        })
        
    }
})
// EACH FOOD AMOUNT AND TOTAL CART FOOD AMOUNT
cart.get('/total', (req, res)=>{
    try {
        const headerKey = process.env.JWT_HEADER_KEY
        const secureKey = process.env.JWT_SECRET_KEY

        const header = req.header(headerKey)
        const verified = jwl.verify(header, secureKey)

        if (verified){
            
            const gettingFOOD = async(takingIds)=>{
                return new Promise((resolve, reject)=>{
                    const sql = `SELECT * FROM food_items WHERE food_id='${takingIds}'`
                    database.query(sql, (err, foodDetails)=>{
                        if (err) {
                            reject(err)
                        } else {
                            resolve(foodDetails)
                        }
                    })
                })
            }
            const totalAmount=async(takeQuantity,takingAmount)=>{
                return new Promise((resolve, reject)=>{
                  const  total = takeQuantity * takingAmount
                    if (total === null || undefined) {
                        reject('failed')
                    } else {
                        resolve(total)
                    }
                })
            }
            const userID = verified.user_id

            let checkingSql = `SELECT * FROM user_cart WHERE user_id = '${userID}' AND cart_quantity != '0' `;
            
            database.query(checkingSql, async (err, results)=>{
                if (err) {
                    res.status(400).json({
                        server :false,
                        message : "Technical issue",
                        err

                    })
                } else {
                    if (results.length === 0) {
                        res.status(400).json({
                            server : false,
                            message : "No items added in Cart"
                        })
                    } else {
                        

                    for(let i = 0; i < results.length; i++){
                        const takingIds = results[i].cart_food_id
                        results[i].foodDetails = await gettingFOOD(takingIds);
                        const takingAmount = results[i].foodDetails[0].food_amount
                        const takingquantity = results[i].cart_quantity
                        results[i].total = await totalAmount(takingAmount, takingquantity)
                    }

                   const Total_cart_Amount = results.map((amount)=>amount.total).reduce((foodAmount, totalAmountOfCart)=>foodAmount + totalAmountOfCart)
                    
                    res.status(200).json({
                        server : true,
                        message : "Items Added to Cart",
                        Cart : results,
                        cartTotal :Total_cart_Amount
                    })
                }
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            server : false,
            error
        })
    }
})
// ADD CART
cart.post('/add/:foodId', (req, res)=>{
    try {
        let cartAdded = req.params.foodId
        const cart_quantity = 1;
        const cartId = Math.floor(10000000 * Math.random() + 99999999)
        const headerKey = process.env.JWT_HEADER_KEY;
        const secureKey = process.env.JWT_SECRET_KEY;

        const header = req.header(headerKey)
        const verified = jwl.verify(header, secureKey)

        if (verified) {
            const userId = verified.user_id

        let sql = `SELECT * FROM user_cart WHERE user_id = '${userId}' AND cart_food_id ='${cartAdded}' `;

        database.query(sql, (err, results)=>{
            if (err) {
                res.status(400).json({
                    server : false,
                    message : 'technical error',
                    err
                })
            } else {
                if (results.length === 0) {
                    let cartSql = `INSERT INTO user_cart(cart_id, user_id, cart_food_id, cart_quantity) 
                    VALUES('${cartId}', '${userId}', '${cartAdded}', '${cart_quantity}')`;
                    
                    database.query(cartSql, (err, results)=>{
                        if (err) {
                            res.status(400).json({
                                server : false,
                                message : "there is an error in database",
                                err
                            })
                        } else {
                            
                            res.status(200).json({
                                server : true,
                                message : "item added to cart",
                                food : results
                            })
                        }
                    })
                } else {
                    
               res.status(400).json({
                server : false,
                message : 'item already exist'
               })
                    
                }
                
            }
        })
            
    } else {
        res.status(400).json({
            server : false,
            message : "token not verified",
        })  
    }
    } catch (error) {
        res.status(500).json({
            server : false,
            message : 'invalid info',
            error
        })
    }
})
// + CART
cart.put('/quantity/:foodId', (req, res)=>{
    try {
        let cartAdded = req.params.foodId
        const headerKey = process.env.JWT_HEADER_KEY;
        const secureKey = process.env.JWT_SECRET_KEY;

        const header = req.header(headerKey)
        const verified = jwl.verify(header, secureKey)

        if (verified) {

            const userid = verified.user_id

            const quatityQuery = `SELECT * FROM user_cart WHERE user_id = '${userid}' AND cart_food_id ='${cartAdded}'`

            database.query(quatityQuery, (err, results)=>{
                if (err) {
                    res.status(400).json({
                        server : false,
                        err
                    })
                } else {
                    const takeQuantity = results[0].cart_quantity
                    const add = takeQuantity + 1
                    const quantitySql = `UPDATE user_cart SET cart_quantity = '${add}' 
                       WHERE user_id = '${userid}' AND cart_food_id ='${cartAdded}'`
    
                    database.query(quantitySql, (err, quantityResults)=>{
                        if (err) {
                            res.status(400).json({
                                server : false,
                                message : 'technical issue',
                                err
                            })
                        } else {
                            res.status(200).json({
                                server : true,
                                message : 'quantity increased',
                                quantityResults
                            })
                        }
                       })
                }
            })
        } else {
            
        }
    } catch (error) {
        res.status(500).json({
            server :false,
            error
        })
    }
})

// - CART
cart.put('/minus/:foodId', (req, res)=>{
    try {
        let cartAdded = req.params.foodId
        const headerKey = process.env.JWT_HEADER_KEY;
        const secureKey = process.env.JWT_SECRET_KEY;

        const header = req.header(headerKey)
        const verified = jwl.verify(header, secureKey)

        if (verified) {

            const userid = verified.user_id

            const quatityQuery = `SELECT * FROM user_cart WHERE user_id = '${userid}' AND cart_food_id ='${cartAdded}'`

            database.query(quatityQuery, (err, results)=>{
                if (err) {
                    res.status(400).json({
                        server : false,
                        err
                    })
                } else {
                    const takeQuantity = results[0].cart_quantity

                    if (takeQuantity === 1) {

                        let sql = `DELETE FROM user_cart WHERE user_id = '${userid}'AND cart_food_id = '${cartAdded}'`;

                        database.query(sql, (err, results)=>{
                            if (err) {
                                res.status(400).json({
                                    server : false,
                                    err
                                })
                            } else {
                                res.json({
                                    server : true,
                                    message : 'item removed'
                                })              
                            }
                        })
                    } else {
                        
                    const add = takeQuantity - 1

                    const quantitySql = `UPDATE user_cart SET cart_quantity = '${add}' 
                        WHERE user_id = '${userid}' AND cart_food_id ='${cartAdded}'`
    
                    database.query(quantitySql, (err, quantityResults)=>{
                        if (err) {
                            res.status(400).json({
                                server : false,
                                message : 'technical issue',
                                err
                            })
                        } else {
                            res.status(200).json({
                                server : true,
                                quantityResults
                            })
                        }
                        })
                    }
                }
            })
        } else {
            res.status(400).json({
                server : false,
                message : 'technical issue',
            })
        }
    } catch (error) {
        res.status(500).json({
            server :false,
            error
        })
    }
})

// REMOVE SPECIFIC FOOD ID 
cart.delete('/food/remove', (req, res)=>{
    try {
        const foodId = req.body.food_id
        const headerkey = process.env.JWT_HEADER_KEY;
        const scurekey = process.env.JWT_SECRET_KEY
        const header = req.header(headerkey)
        const verify = jwl.verify(header,scurekey)

        if (verify) {
        const userrID = verify.user_id

        const sql = `DELETE FROM user_cart WHERE user_id='${userrID}' AND cart_food_id = '${foodId}'`

        database.query(sql, (err, results)=>{
            if (err) {
                res.status(400).json({
                    server : false,
                    err
                })
            } else {
               res.status(200).json({
                server :true,
                message : "item removed succesfully",
                results
               })
            }
        })
        
    } else {
        res.status(400).json({
            server : false,
            message : "token not verified"
        })
    }
    } catch (error) {
        res.status(500).json({
            server : false,
            error
        })
    }
})
// REMOVE CART
cart.delete('/remove', (req, res)=>{
    try {
        let cartAdded = req.params.foodId
        const headerKEy = process.env.JWT_HEADER_KEY
        const secureKEy = process.env.JWT_SECRET_KEY

        const headerDesiding = req.header(headerKEy)
        const verified = jwl.verify(headerDesiding, secureKEy)

        if (verified) {

        const userId= verified.user_id
        
        let checkSql = `SELECT * FROM user_cart WHERE user_id = '${userId}' `;

        database.query(checkSql, (err, results)=>{
            if (err) {
                res.status(400).json({
                    server :false,
                    mesage : 'technical issue',
                    err
                })
            } else {
                if (results.length === 0) {
                    res.json({
                        server : false,
                        message : 'ids not matched'
                    })

                } else {

        let sql = `DELETE FROM user_cart WHERE user_id = '${userId}'`;

        database.query(sql, (err, results)=>{
            if (err) {
                res.status(400).json({
                    server : false,
                    err
                })
            } else {
                res.json({
                    server : true,
                    message : 'item moved for payment'
                })              
            }
        })
                }
            }
        })
    } else {
         res.status(400).json({
            server : false,
            message : 'not verified'
         })   
    }
    } catch (error) {
       res.status(500).json({
        server : false,
        error
       }) 
    }
})
module.exports = cart