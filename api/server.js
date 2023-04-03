const express = require('express');
const env = require("dotenv");
const cors = require('cors')

const userController = require("./controllers/userController");
const foodController = require("./controllers/foodController");
const ordersController = require("./controllers/ordersController");
const addressController = require("./controllers/addressController");
const paymentsController = require("./controllers/paymentController");
const userCart = require('./controllers/userCart')

const app = express();

env.config();

app.listen(process.env.PORT, ()=>{
    console.log("server working at 3120")
})

app.use(cors({
    origin : '*',
  
}))

app.use(express.json());

app.use("/user/", userController);
app.use("/food/", foodController);
app.use("/order/", ordersController);
app.use("/address/", addressController);
app.use("/payment/", paymentsController)
app.use("/cart/", userCart)

