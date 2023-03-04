const express = require('express');
const database = require('../configures/database');
const type = express.Router();

type.get("/type/", (req, res)=>{
    try {
        const typeId = req.body.type_id;
        const typeName = req.body.type_name;
        const typeStatus = req.body.type_status;
        const ifdeleted = req.body.type_ifdeleted;

        let typeQuerysql =`SELECT * FROM `;
        
    } catch (error) {
        
    }
})
