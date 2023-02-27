const express = require("express");
const database = require("../configures/database");
const jwl = require("jsonwebtoken")
const router = express.Router();

// home page of users
router.get("/", (req, res)=>{
    try {
        res.status(200).json({
            server : true,
            message : "connections working properly"
        })
    } catch (error) {
        res.status(500).json({
            server : false,
            message  :"connection failed",
            error
        })
    }
});

// getting users list
router.get("/list/", (req, res)=>{
    try {
        let listSql = `SELECT * FROM users_data WHERE user_ifdeleted = '0'`;

        database.query(listSql, (err, results)=>{
            if(err){
                res.status(400).json({
                    server : false,
                    message : "no data found",
                    err
                })
            }
            else{
                res.status(400).json({
                    server : true,
                    message : 'users list found',
                    results
                })
            }
        })
    } catch (error) {
        res.status(500).json({
            message : 'invalid details',
            error
        })
    }
})

// searching user with user id
router.get("/:user_id/", (req, res)=>{
        try {

            const checkingUser = req.params.user_id;

            var sql = `SELECT * FROM users_data WHERE user_id = '${checkingUser}' AND user_ifdeleted = '0'`;

            database.query(sql, (err, results)=>{
                if(err){
                    res.status(400).json({
                        server : false,
                        message : "user not found",
                        err
                    })
                }
                else{
                    if(results.length === 0){
                        res.status(400).json({
                            server : false,
                            message :  "Id not matched, try again",

                        })
                    }
                    else{
                        res.status(200).json({
                            server : true,
                            message : "User Found Succesfully",
                            results
                        })
                    }
                }
            })

        } catch (error) {
            res.status(500).json({
                server : false,
                message : "Id not matched, try again",
                error
            })
        }
    
});

// registering user
router.post("/register/", (req, res)=>{ 
    try {

        const id = Math.floor(1000000 * Math.random() + 9999999);
        const nameUser = req.body.user_name;
        const mobileUser = req.body.user_mobile;
        const emailUser = req.body.user_email;
        const passwordUser = req.body.user_password;
        const statusUser = req.body.user_status;
        const ifdeletedUser = req.body.user_deleted;
    
        const conditionalSqlquery = `SELECT * FROM users_data WHERE user_mobile='${mobileUser}' AND user_email='${emailUser}' AND user_ifdeleted='0'`;
        
        database.query(conditionalSqlquery, (err, existingResults)=>{
            if (err) {
                res.status(400).json({
                    server : false,
                    message : 'user not created',
                    err
                })
            } else {
                if (existingResults == 0) {

                    const regSql = `INSERT INTO users_data(user_id, user_name, user_mobile, user_email, user_password, user_status, user_ifdeleted) VALUES ('${id}', '${nameUser}', '${mobileUser}', '${emailUser}', '${passwordUser}', '${statusUser}', '${ifdeletedUser}')`;
        
                    database.query(regSql, (err, results)=>{
                        if(err){
                            res.status(400).json({
                                server : false,
                                message : "User Not created",
                                err
                            })
                        }
                        else{
                            res.status(200).json({
                                server : true,
                                message : "User created succesfully",
                                results
                            })
                        }
                    }) 
                }
                else{
                    res.status(401).json({
                        server : false,
                        message : "user details already taken, try to add new details"
                    })
                }
            }
        })

   

    } catch (error) {
        res.status(500).json({
            server : false,
            message : "Error while creating user",
            error
        })
    }
});

// updating user
router.put("/update/", (req, res)=>{
    try {
        const Id = req.body.user_id;
        const nameUser = req.body.user_name;
        const mobileUser = req.body.user_mobile;
        const emailUser = req.body.user_email;
        const passwordUser = req.body.user_password;
        const statusUser = req.body.user_status;
        const ifdeletedUser = req.body.user_ifdeleted;
        const headerToken = process.env.JWT_HEADER_KEY;
        const secreatToken = process.env.JWT_SECRET_KEY;

        const token = req.header(headerToken);
        const verifyToken = jwl.verify(token, secreatToken);

    if (verifyToken) {
    
        const exUserSql = `SELECT * FROM users_data WHERE user_id = '${Id}' AND user_ifdeleted = '0'`;

        database.query(exUserSql, (error, results)=>{
            if (error) {
                res.status(400).json({
                    server : false,
                    message : "Invalid Id",
                    error
                })
            } else {
                if(results.length === 0){
                    res.status(400).json({
                        server : false,
                        message : "User not found",
                    })
                }
                else{
                    var updateSql = `UPDATE users_data SET user_name = '${nameUser}', user_mobile = '${mobileUser}', user_email = '${emailUser}', user_password = '${passwordUser}', user_status = '${statusUser}', user_ifdeleted = '${ifdeletedUser}'
                    WHERE user_id = '${Id}' AND user_ifdeleted = '0'`;

                    database.query(updateSql, (error, results)=>{
                        if(error){
                            res.status(400).json({
                                server : false,
                                message : "User Not updated",
                                error
                            })
                        }
                        else{
                            res.status(200).json({
                                server : true,
                                message : "User Updated Succesfully",
                                results
                            })
                        }
                    })
                }
               
            }

        })
    } else {
        res.status(400).json({
            server : false,
            msg : "user unautherized"
        })
    
        }
    
    } catch (error) {
        res.status(500).json({
            server : false,
            message : "Connections failed",
            error
        })
    }
});


// deleting user details
router.delete("/delete/:userId", (req, res)=>{
    try {
        const Id = req.params.userId;

        const checkingUser = `SELECT * FROM users_data WHERE user_id = '${Id}' AND user_ifdeleted = '0'`;

        database.query(checkingUser, (err, results)=>{
            if(err){
                res.status(400).json({
                    server : false,
                        message : "User Not Found in database",
                        err
                })
            }
            else{
                if(results.length === 0){
                    res.status(400).json({
                        message : "User Id mistake"
                    })
                }
                else{
                    const deleteSql = `UPDATE users_data SET user_ifdeleted = '1' WHERE user_id = '${Id}' AND user_ifdeleted = '0'`;

                    database.query(deleteSql, (error, results)=>{
                        if(error){
                            res.status(400).json({
                                message : "User not deleted",
                                error
                            })
                        }
                        else{
                            res.status(200).json({
                                message : "User deleted succesfully",
                            })
                        }
                    })
                }
            }
        })
        
    } catch (error) {
        res.status(500).json({
            error
        })
    }
});

// login
router.post("/login/", (req, res)=>{
    try {
        const username = req.body.username;
        const userpassword = req.body.userpassword;

        const checkingQuerysql = `SELECT * FROM users_data WHERE user_email = '${username}'`;

        database.query(checkingQuerysql, (err, userResults)=>{
            if (err) {
                res.status(400).json({
                    server : false,
                    msg : "user not found, try to register",
                    err
                })
            } else {
              if (userResults.length != 0) {
                const takingUserIdfromResult = userResults[0].user_id;
                const takingUserpasswordfromResult = userResults[0].user_password;
                if (takingUserpasswordfromResult == userpassword) {
                    let secureKey = process.env.JWT_SECRET_KEY;
                    let sessionData = {
                        time : Date(),
                        user_id : takingUserIdfromResult,
                        user_name : username
                    }
        const tokenCreating = jwl.sign(sessionData, secureKey, {expiresIn : process.env.JWT_EXPIRYPERIOD_KEY})
                    res.status(200).json({
                        server : true,
                        msg: "user login succesfully",
                        token : tokenCreating
                    })
                } else {
                    res.status(400).json({
                        server : false,
                        msg : "user faled to login"
                    })
                }
              } else {
                  res.status(401).json({
                    server : false,
                    msg : "user not found"
                })
              }
            }
        })

    } catch (error) {
        res.status(500).json({
            msg : "invalid info",
            error 
            
        })
    }
})
module.exports = router;