require("dotenv").config();
require('./service/conn');
const bodyParser=require('body-parser');
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors())
const port = process.env.PORT || 2000
const userRoute = require("./routers/userRouter");
const taskRoute = require("./routers/taskRouter");

app.use(bodyParser.json());
app.use('/user',userRoute);
app.use('/task',taskRoute);

app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`)
})