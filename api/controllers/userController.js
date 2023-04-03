const express = require("express");
const database = require("../configures/database");
const jwl = require("jsonwebtoken")
const router = express.Router();
const multer = require('multer')

// HOME PAGE OF USER 
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

// JUST SIMPLY GETTING USERS DETAILS
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

// AUTHORISATION PAGE
router.post('/auth/', (req, res)=>{
    try {
        const tokenHeader = process.env.JWT_HEADER_KEY
        const tokenSecurekey = process.env.JWT_SECRET_KEY

        const header = req.header(tokenHeader)
        const verified = jwl.verify(header, tokenSecurekey)

        if (verified) {
            const userId = verified.user_id
            
            const userSql = `SELECT * FROM users_data WHERE user_id='${userId}' AND user_ifdeleted = '0'`

            database.query(userSql, (error, results)=>{
                if (error) {
                    res.json({
                        server :false,
                        message : 'technical issue',
                        error
                    })
                } else {
                    if (results.length === 0) {
                        res.json({
                            server : false,
                            message : 'user not in session',
                        })
                    } else {
                        res.json({
                            server : true,
                            message : "user succesfully in session",
                            user : results
                        })
                    }
                }
            })
        } else {
            res.status(400).json({
                server : false,
                message : "user not in session"
            })
        }
    } catch (error) {
        res.status(500).json({
            server : false,
            error
        })
    }
})
// SEARCHING USER WITH HIS ID
router.get("/user", (req, res)=>{
        try {
            const jwlHeader = process.env.JWT_HEADER_KEY;
            const jwwlSecurekey = process.env.JWT_SECRET_KEY;

            const headerKey = req.header(jwlHeader)
            const verify = jwl.verify(headerKey, jwwlSecurekey)

            if (verify) {
                const userId = verify.user_id

            var sql = `SELECT * FROM users_data WHERE user_id = '${userId}' AND user_ifdeleted = '0'`;

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
                            user : results
                        })
                    }
                }
            })
                            
        } else {
            res.status(400).json({
                server : false,
                message : "failed to verify",
            })    
        }

        } catch (error) {
            res.status(500).json({
                server : false,
                message : "Id not matched, try again",
                error
            })
        }
    
});

// USER REGISTRATION AND FOCUS ON ( === || == )
const devicestorage = multer.diskStorage({
    destination : function (err, file, cb){
        cb(null, "./pictures")
    },
    filename : function (err, file, cb){
        cb(null, file.originalname)
    }
})
const uploadImg = multer({storage : devicestorage})
router.post('/register/', uploadImg.single('profile'),(req, res)=>{
    try {
        const userId = Math.floor(1000000 * Math.random() + 9999999)
        const userName = req.body.username;
        const userMobile = req.body.usermobile;
        const userEmail = req.body.useremail;
        const profilePic = req.file.path
        const userPassword = req.body.userpassword;
        const userStatus = req.body.userstatus;
        const userIfdeleted = req.body.userifdeleted;

        let conditionalQuerysql = `SELECT * FROM users_data WHERE user_mobile = '${userMobile}'`;

        database.query(conditionalQuerysql, (err, exResults)=>{
            if (err) {
                res.status(400).json({
                    server : false,
                    message : 'user details are not valid',
                    err
                })
            } else {

                if (exResults.length === 0) {

                    const sql = `SELECT * FROM users_data WHERE user_email = '${userEmail}'`;
                    database.query(sql, (err, emailResults)=>{
                        if (err) {
                            res.status(400).json({
                                server : false,
                                message : 'invalid email',
                                err
                            })
                        } else {
                         if (emailResults.length === 0) {

                const registerSqlQuery = `INSERT INTO users_data(user_id, user_name, user_mobile, user_email, user_image, user_password, user_status, user_ifdeleted)
                VALUES('${userId}', '${userName}', '${userMobile}', '${userEmail}', '${profilePic}', '${userPassword}', '${userStatus}', '${userIfdeleted}')`;

                database.query(registerSqlQuery, (err, results)=>{
                    if (err) {
                        res.status(400).json({
                            server : false,
                            message : "user not created",
                            err
                        })
                    } else {
                        res.status(200).json({
                            server : true,
                            message : "user created succesfully",
                            results
                        })
                    }
                })
                } else {
                        res.status(400).json({
                            server : false,
                            message : "email already exists try to login"
                        })
                     }
                        }
                    })
                } else {
                    res.status(400).json({
                        server : false,
                        message : "Mobile number is already taken. Try new Mobile number",
                    })
                }
            }
        })
    } catch (error) {
        res.status(500).json({
            server : false,
            error
        })
    }
})

// UPDATE USER
router.put("/update/", (req, res)=>{
    try {
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

        const Id = verifyToken.user_id;
        const exUserSql = `SELECT * FROM users_data WHERE user_id = '${Id}' AND user_ifdeleted = '0'`;

        database.query(exUserSql, (error, userResults)=>{
            if (error) {
                res.status(400).json({
                    server : false,
                    message : "Invalid Id",
                    error
                })
            } else {
                if(userResults.length === 0){
                    res.status(400).json({
                        server : false,
                        message : "User not found",
                    })
                }
                else{
                    const checkingEmail = `SELECT * FROM users_data WHERE user_email = '${emailUser}'`;

                    database.query(checkingEmail, (error, checkedResults)=>{
                        if (error) {
                            res.status(400).json({
                                server : false,
                                message : 'Failed to update',
                                error
                            })
                        } else {
                            if (checkedResults.length != 0) {
                                res.status(401).json({
                                    server : false,
                                    message : 'Email already taken. Try new one'
                                })
                            } else {
                                const checkingMobile = `SELECT * FROM users_data WHERE user_mobile ='${mobileUser}'`;

                                database.query(checkingMobile, (error, checkedMobile)=>{
                                    if (error) {
                                        res.status(400).json({
                                            server : false,
                                            message : 'Failed to update',
                                            error
                                        })
                                    }else{
                                        if (checkedMobile != 0) {
                                            res.status(401).json({
                                                server : false,
                                                message : "Mobile already taken try new one"
                                            })
                                        } else {
                                            const checkingPassword = `SELECT * FROM users_data WHERE user_password ='${passwordUser}'`;

                                            database.query(checkingPassword, (err, checkedPassword)=>{
                                                if (err) {
                                                    res.status(401).json({
                                                        server : false,
                                                        message : 'invalid info',
                                                        err
                                                    })
                                                } else {
                                                    if (checkedPassword != 0) {
                                                        
                                                        var updateSql = `UPDATE users_data SET user_name = '${nameUser}', user_mobile = '${mobileUser}', user_email = '${emailUser}',
                                                        user_password = '${passwordUser}', user_status = '${statusUser}', user_ifdeleted = '${ifdeletedUser}'
                                                        WHERE user_id = '${Id}' AND user_ifdeleted = '0'`;
                                    
                                                        database.query(updateSql, (error, results)=>{
                                                            if(error){
                                                                res.status(400).json({
                                                                    server : false,
                                                                    message : "Invalid data",
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
                                                    } else {
                                                        res.status(400).json({
                                                            server : false,
                                                            message : 'Wrong password'
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

// DELETE USER
router.delete("/delete/:user_id", (req, res)=>{
    try {
        const userId = req.params.user_id
        const useremail = req.body.user_email
        const userpassword = req.body.user_password
        const secreatKey = process.env.JWT_SECRET_KEY
        const headerKey = process.env.JWT_HEADER_KEY

        let tokenHead = req.header(headerKey)
        let verify = jwl.verify(tokenHead, secreatKey)

        if (verify) {
            
        const checkingUser = `SELECT * FROM users_data WHERE user_id = '${userId}' AND user_email = '${useremail}' AND user_password = '${userpassword}' AND user_ifdeleted = '0'`;

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
                    const deleteSql = `UPDATE users_data SET user_ifdeleted = '1' WHERE user_id = '${userId}' AND user_email = '${useremail}' 
                                        AND user_password = '${userpassword}'AND user_ifdeleted = '0'`;

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

        }
        else{
            res.status(400).json({
                server : false,
                messge : "verification failed"
            })
        }
    
    } catch (error) {
        res.status(500).json({
            error
        })
    }
});

// LOGIN 
router.post("/login/", (req, res)=>{
    try {
        const username = req.body.username;
        const userpassword = req.body.userpassword;

        const checkingQuerysql = `SELECT * FROM users_data WHERE user_email = '${username}' AND user_ifdeleted = '0'`;

        database.query(checkingQuerysql, (err, userResults)=>{
            if (err) {
                res.status(400).json({
                    server : false,
                    msg : "user not found, try to register",
                    err
                })
            } else {
                
                if (userResults.length == 0) {
                    
                    res.status(401).json({
                      server : false,
                      msg : "user not found"
                  })
                 
              } else {

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
                           msg : "user failed to login"
                       })
                   }
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