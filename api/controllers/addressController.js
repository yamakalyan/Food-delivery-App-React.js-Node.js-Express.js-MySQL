const express = require("express");
const database = require("../configures/database")
const address = express.Router();
 
address.get("/", (req, res)=>{
    try {
        res.send("address working properly")
    } catch (error) {
        res.send("erroe in address")
    }
});


// adding specific user id automatically to address 
address.post("/add/:user_id/", (req, res)=>{
    try {
        const addressId = Math.floor(1000000 + Math.random() * 9999999);
        const userId = req.params.user_id;
        const parAdress = req.body.permanant_address;
        const temAddress = req.body.temporary_address;
        const addressStatus = req.body.address_status;

      const sql = `SELECT user_id FROM users_data WHERE user_id ='${userId}'`;

      database.query(sql, (error, results)=>{
        if (error) {
            res.json({
                message : "user not found",
                error
            })
        } else {
            const takingId = results[0].user_id;

            const addingSql = `INSERT INTO users_address(address_id, user_id, permanant_address, temporary_address, address_status)
            VALUES('${addressId}', '${takingId}', '${parAdress}', '${temAddress}', '${addressStatus}')`;

            database.query(addingSql, (err, addressResult)=>{
                if (err) {
                    res.json({
                        message : "user found but id not added to address",
                        err
                    })
                } else {
                    res.json({
                        message : "address added succesfully with user id",
                    
                    })
                }
            })
        }
      })
       
    } catch (error) {
        res.json({
            message : "invalid info",
            error
        })
    }
})

address.put("/update/:user_id/", (req, res)=>{
    try {
        const userId = req.params.user_id;
        const parmAddress = req.body.permanant_address;
        const tempAddress = req.body.temporary_address;
        const addressStatus = req.body.address_status;

        const checkingSql = `SELECT * FROM users_address WHERE user_id = '${userId}'`;

        database.query(checkingSql, (err, checkingResults)=>{
            if (err) {
                res.json({
                    message : "id not matched",
                    err
                })
            } else {
                if(checkingResults.length === 0){
                    res.json({
                        message : "no address found"
                    })
                }
                else{
                    const updateSql = `UPDATE users_address 
                    SET permanant_address = '${parmAddress}',
                    temporary_address = '${tempAddress}',
                    address_status = '${addressStatus}'
                    WHERE user_id = '${userId}'`;
                    
                    database.query(updateSql, (err, updatedResults)=>{
                        if (err) {
                            res.json({
                                message : "address not updated",
                                err
                            })
                        } else {
                            res.json({
                                message : "address succesfully updated",
                                updatedResults
                            })
                        }
                    })
                }
            }
        })
    } catch (error) {
        res.json({
            message : "technical error",
            error
        })
    }
});

address.delete("/delete/:user_id/", (req, res)=>{
    try {
        const id = req.params.user_id;

        const checkingSql = `SELECT * FROM users_address WHERE user_id = '${id}'`;

        database.query(checkingSql, (err, checkingResults)=>{
            if (err) {
                res.json({
                    message : "no data found",
                    err
                })
            } else {
                if (checkingResults.length === 0) {
                    res.json({
                        message : "unable to delete"
                    })
                } else {
                    const deleteSql = `DELETE FROM users_address WHERE user_id = '${id}'`;

                    database.query(deleteSql, (err, result)=>{
                        if (err
                            ) {
                            res.json({
                                message : "id not matched, not deleted",
                                err
                            })
                        } else {
                            res.json({
                                message : 'address succesfully deleted'
                            })
                        }
                    }) 
                }
            }
        })
    } catch (error) {
        res.json({
            message : "invalid info",
            error
        })
    }
})

module.exports = address;