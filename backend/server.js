const dotenv = require("dotenv").config();
const express = require("express");
const colors = require('colors');
const connectDb = require("./utils/dbSetup");
const app = express();

app.get('/', (req, res) => {
    res.send("hello from  the server!");
})

const PORT = process.env.PORT || 3001;
connectDb();

app.listen(PORT, () => {
    console.log("Server is listening at port".yellow.bold, PORT);
});