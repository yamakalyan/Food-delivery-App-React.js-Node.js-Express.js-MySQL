const express = require("express");
const database = require("../configures/dbconf");
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
})
module.exports = router;