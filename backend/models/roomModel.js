const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    ownerName: { type: String, required: true },
    images: [{ type: String }],
    address: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: {
        latitude: { type: String },
        longitude: { type: String }
    }
},
    {
        timestamps: true,
        collection: 'rooms' 
    });

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
