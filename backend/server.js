const dotenv = require("dotenv").config();
const express = require("express");
const colors = require('colors');
const connectDb = require("./utils/dbSetup");
const { PORT } = require("./utils/envData");
const app = express();

app.get('/', (req, res) => {
    res.send("hello from  the server!");
})

connectDb();

app.listen(PORT, () => {
    console.log("Server is listening at port".yellow.bold, PORT);
});