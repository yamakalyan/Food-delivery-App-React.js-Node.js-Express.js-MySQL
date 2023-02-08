const mysql = require("mysql");

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "kd_data"
})

db.connect((error)=>{
    if (error) {
        console.log("there is an error while connecting database")
    } else {
        console.log("database succesfully connected")
    }
})

module.exports = db;