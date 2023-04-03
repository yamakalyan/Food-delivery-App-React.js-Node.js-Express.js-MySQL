const express = require("express");
const database = require("../configures/database")
const address = express.Router();
const jsonwebtoken = require("jsonwebtoken")
 
// HOME OF ADDRESS PAGE
address.get("/address/:address_id", (req, res)=>{
    try {
        const addresssID = req.params.address_id
        const getQuery = `SELECT * FROM users_address WHERE address_id = '${addresssID}' AND address_ifdeleted = '0'`;

        database.query(getQuery, (err, results)=>{
            if (err) {
                res.status(400).json({
                    server: false,
                    message : "address not found ",
                    err
                })
            }else{
                res.status(200).json({
                    server : true,
                    message : 'address found',
                    results
                })
            }
        })
    
    } catch (error) {
        res.status(500).json({
            server: false,
            error
        })
    }
});

// CREATE ADDRESS
address.post("/create/", (req, res)=>{
    try {
        const addressId = Math.floor(1000000 + Math.random() * 9999999);
        const parAdress = req.body.permanant_address;
        const addressStatus = req.body.address_status;
        const addressIdeleted = req.body.address_ifdeleted;

        const jwlHEader = process.env.JWT_HEADER_KEY
        const secureKeyJwl = process.env.JWT_SECRET_KEY

        const headerToken = req.header(jwlHEader)
        const verify = jsonwebtoken.verify(headerToken, secureKeyJwl)

        if (verify) {
            const userId = verify.user_id

        const addingSql = `INSERT INTO users_address(address_id, user_id, permanant_address, address_status, address_ifdeleted)
        VALUES('${addressId}', '${userId}', '${parAdress}', '${addressStatus}', '${addressIdeleted}')`;

        database.query(addingSql, (err, addressResult)=>{
            if (err) {
                res.status(400).json({
                    message : "address failed to add",
                    err
                })
            } else {
                res.status(200).json({
                    message : "address added succesfully",
                    addressResult
                
                })
            }
        })
    } else {
        res.status(400).json({
            message : "address failed to verify",
        })     
    }
       
    } catch (error) {
        res.status(500).json({
            message : "invalid info",
            error
        })
    }
})

// UPDATE ADDRESS WITH USER ID
address.put("/update/", (req, res)=>{
    try {
        const parmAddress = req.body.permanant_address;
        const addressStatus = req.body.address_status;

        const jwlHeaderkey = process.env.JWT_HEADER_KEY
        const jwtSecreatkey = process.env.JWT_SECRET_KEY;

        const tokenHead = req.header(jwlHeaderkey);

        const verified = jsonwebtoken.verify(tokenHead, jwtSecreatkey)

        if (verified) {
            const userID = verified.user_id

        const checkingSql = `SELECT * FROM users_address WHERE user_id = '${userID}' AND address_ifdeleted = '0'`;

        database.query(checkingSql, (err, checkingResults)=>{
            if (err) {
                res.status(400).json({
                    message : "id not matched",
                    err
                })
            } else {
                if(checkingResults.length === 0){
                    res.status(400).json({
                        message : "no address found"
                    })
                }
                else{
                    const updateSql = `UPDATE users_address 
                    SET permanant_address = '${parmAddress}',
                    address_status = '${addressStatus}'
                    WHERE user_id = '${userID}' AND address_ifdeleted = '0'`;
                    
                    database.query(updateSql, (err, updatedResults)=>{
                        if (err) {
                            res.status(401).json({
                                message : "address not updated",
                                err
                            })
                        } else {
                            res.status(200).json({
                                message : "address succesfully updated",
                                updatedResults
                            })
                        }
                    })
                }
            }
        })
    } else {
        res.status(400).json({
            message : "user not verified to update address",
        })     
    }
    } catch (error) {
        res.status(500).json({
            message : "technical error",
            error
        })
    }
});

// GET ADDRESS OF USER WITH HIS ID
address.get("/userId", (req, res)=>{
    try {
        const jwlHEader = process.env.JWT_HEADER_KEY
        const secureKeyJwl = process.env.JWT_SECRET_KEY

        const headerToken = req.header(jwlHEader)
        const verify = jsonwebtoken.verify(headerToken, secureKeyJwl)

        if (verify) {

            const userId = verify.user_id

        const getQuery = `SELECT * FROM users_address WHERE user_id = '${userId}' AND address_ifdeleted = '0'`;

        database.query(getQuery, (err, results)=>{
            if (err) {
                res.status(400).json({
                    server: false,
                    message : "address not found with user id",
                    err
                })
            } else {
                if(results.length === 0){
                    res.status(400).json({
                        server : false,
                        message : "address not found",

                    })
                }
                else{
                    res.status(200).json({
                        server : true,
                        message : "address found succesfully",
                        results
                    })
                }
            }
        })
    }else{
        res.status(400).json({
            server : false,
            message : "address failed to verify",

        })
    }
    } catch (error) {
        res.status(500).json({
            server : false,
            message : "invalid user info",
            error
        })
    }
})
// DELETE ADDRESS WITH HIS ID
address.delete("/delete/:user_id/", (req, res)=>{
    try {
        const id = req.params.user_id;

        const checkingSql = `SELECT * FROM users_address WHERE user_id = '${id}' AND address_ifdeleted = '0'`;

        database.query(checkingSql, (err, checkingResults)=>{
            if (err) {
                res.status(400).json({
                    message : "no data found",
                    err
                })
            } else {
                if (checkingResults.length === 0) {
                    res.status(400).json({
                        message : "unable to delete"
                    })
                } else {
                    const deleteSql = `UPDATE users_address SET address_ifdeleted = '1' WHERE user_id = '${id}'  AND address_ifdeleted = '0'`;

                    database.query(deleteSql, (err, result)=>{
                        if (err
                            ) {
                            res.status(400).json({
                                message : "id not matched, not deleted",
                                err
                            })
                        } else {
                            res.status(200).json({
                                message : 'address succesfully deleted'
                            })
                        }
                    }) 
                }
            }
        })
    } catch (error) {
        res.status(500).json({
            message : "invalid info",
            error
        })
        
    }
    
})

module.exports = address;