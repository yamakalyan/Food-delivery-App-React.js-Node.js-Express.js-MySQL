const express = require('express');
const creatingconnections = require("./controllers/connecting")
const app = express();


app.listen(3120, ()=>{
    console.log("server working at 3120")
})

app.use(express.json());

app.use("/create/", creatingconnections)


