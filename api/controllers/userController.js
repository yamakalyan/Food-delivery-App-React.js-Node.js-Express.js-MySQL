const express = require("express");
const database = require("../configures/database");
const router = express.Router();

router.get("/", (req, res)=>{
    try {
        res.json({
            server : true,
            message : "connections working properly"
        })
    } catch (error) {
        res.json({
            server : false,
            message  :"connection failed",
            error
        })
    }
});

// users_data// view all users/ finding user with id/ register/ update/ delete /

router.get("/list/", (req, res)=>{
    try {
        let listSql = `SELECT * FROM users_data`;

        database.query(listSql, (err, results)=>{
            if(err){
                res.json({
                    server : false,
                    message : "no data found",
                    err
                })
            }
            else{
                res.json({
                    results
                })
            }
        })
    } catch (error) {
        res.json({
            error
        })
    }
})

router.get("/:user_id", (req, res)=>{
        try {

            const checkingUser = req.params.user_id;

            var sql = `SELECT * FROM users_data WHERE user_id = '${checkingUser}'`;

            database.query(sql, (err, results)=>{
                if(err){
                    res.json({
                        server : false,
                        message : "user not found",
                        err
                    })
                }
                else{
                    if(results.length === 0){
                        res.json({
                            server : false,
                            message :  "Id not matched, try again",

                        })
                    }
                    else{
                        res.json({
                            server : true,
                            message : "User Found Succesfully",
                            results
                        })
                    }
                }
            })

        } catch (error) {
            res.json({
                server : false,
                message : "Id not matched, try again",
                error
            })
        }
    
});

router.post("/register/", (req, res)=>{ 
    try {
        const id = Math.floor(1000000 * Math.random() + 9999999);
        const nameUser = req.body.user_name;
        const mobileUser = req.body.user_mobile;
        const emailUser = req.body.user_email;
        const passwordUser = req.body.user_password;
        const statusUser = req.body.user_status;
        const ifdeletedUser = req.body.user_deleted;
    
    const regSql = `INSERT INTO users_data(user_id, user_name, user_mobile, user_email, user_password, user_status, user_ifdeleted) VALUES ('${id}', '${nameUser}', '${mobileUser}', '${emailUser}', '${passwordUser}', '${statusUser}', '${ifdeletedUser}')`;
        
    database.query(regSql, (err, results)=>{
        if(err){
            res.json({
                server : false,
                message : "User Not created",
                err
            })
        }
        else{
            res.json({
                server : true,
                message : "User created succesfully",
                results
            })
        }
    })    

    } catch (error) {
        res.json({
            server : false,
            message : "Error while creating user",
            error
        })
    }
});

router.put("/update/", (req, res)=>{
    try {
        const Id = req.body.user_id;
        const nameUser = req.body.user_name;
        const mobileUser = req.body.user_mobile;
        const emailUser = req.body.user_email;
        const passwordUser = req.body.user_password;
        const statusUser = req.body.user_status;
        const ifdeletedUser = req.body.user_ifdeleted;

        const exUserSql = `SELECT * FROM users_data WHERE user_id = '${Id}'`;

        database.query(exUserSql, (error, results)=>{
            if (error) {
                res.json({
                    server : false,
                    message : "Invalid Id",
                    error
                })
            } else {
                if(results.length === 0){
                    res.json({
                        server : false,
                        message : "User not found",
                    })
                }
                else{
                    var updateSql = `UPDATE users_data SET user_name = '${nameUser}', user_mobile = '${mobileUser}', user_email = '${emailUser}', user_password = '${passwordUser}', user_status = '${statusUser}', user_ifdeleted = '${ifdeletedUser}'
                    WHERE user_id = '${Id}'`;

                    database.query(updateSql, (error, results)=>{
                        if(error){
                            res.json({
                                server : false,
                                message : "User Not updated",
                                error
                            })
                        }
                        else{
                            res.json({
                                server : true,
                                message : "User Updated Succesfully",
                                results
                            })
                        }
                    })
                }
               
            }

        })
    
    } catch (error) {
        res.json({
            server : false,
            message : "Connections failed",
            error
        })
    }
});

router.delete("/delete/:userId", (req, res)=>{
    try {
        const Id = req.params.userId;
        const nameUser = req.body.user_name;
        const mobileUser = req.body.user_mobile;
        const emailUser = req.body.user_email;
        const passwordUser = req.body.user_password;
        const statusUser = req.body.user_status;
        const ifdeletedUser = req.body.user_ifdeleted;

        const checkingUser = `SELECT * FROM users_data WHERE user_id = '${Id}'`;

        database.query(checkingUser, (err, results)=>{
            if(err){
                res.json({
                    server : false,
                        message : "User Not Found in database",
                        err
                })
            }
            else{
                if(results.length === 0){
                    res.json({
                        message : "User Id mistake"
                    })
                }
                else{
                    const deleteSql = `DELETE FROM users_data WHERE user_id = '${Id}'`;

                    database.query(deleteSql, (error, results)=>{
                        if(error){
                            res.json({
                                message : "User not deleted",
                                error
                            })
                        }
                        else{
                            res.json({
                                message : "User deleted succesfully",
                            })
                        }
                    })
                }
            }
        })
        
    } catch (error) {
        res.json({
            error
        })
    }
});

module.exports = router;