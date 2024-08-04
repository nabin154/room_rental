const mongoose = require('mongoose');
const { mongodbURI } = require('./envData');


const connectDb = async () => {
    try {
        const isConnected = await mongoose.connect(mongodbURI);
        if (connectDb) {
            console.log("MONGODB Connected successfully!".blue.bold);
        }
        else {
            console.log('Failed to connect the database!'.red);
        }
    }
    catch (e) {

        console.log('Failed to connect the database!'.red, e.message);
    }
};



module.exports = connectDb;