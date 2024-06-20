const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

//setting up connection with mongoDB
mongoose.connect("mongodb+srv://as0846403:WYnHGmtEPt7bu4PG@cluster0.u1nvoky.mongodb.net/pro-manage-db?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to db");
}).catch((error) => {
    console.log("Error connecting to db:", error);
});
