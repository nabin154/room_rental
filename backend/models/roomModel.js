const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    ownerName: { type: String, required: true },
    images: [{ type: String }],
    location: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }
},
    {
        timestamps: true,
        collection: 'rooms' 
    });

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
