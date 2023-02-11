const express = require('express');
const creatingconnections = require("./controllers/userController");
const foodReg = require("./controllers/foodController");
const orders = require("./controllers/ordersController");
const address = require("./controllers/addressController");
const payments = require("./controllers/paymentController")
const app = express();


app.listen(3120, ()=>{
    console.log("server working at 3120")
})

app.use(express.json());

app.use("/user/", creatingconnections);

app.use("/food/", foodReg);

app.use("/orders/", orders);

app.use("/address/", address);

app.use("/payment/", payments)

