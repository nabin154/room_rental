const Room = require('../models/roomModel');
const asyncHandler = require('express-async-handler');
const { successResponse } = require('../utils/apiResponse');

const getAllRoomsData = asyncHandler(async (req, res) => {
    const rooms = await Room.find({});
    res.status(200).json(successResponse('Data found succeessfully!!',rooms));
});


const getNearbyRooms = asyncHandler(async (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        res.status(400);
        throw new Error("Latitude and longitude are required");
    }

    const radius = 30;
    const earthRadius = 6371;

    const rooms = await Room.find({});

    const nearbyRooms = rooms.filter(room => {
        const dLat = (room.location.latitude - latitude) * (Math.PI / 180);
        const dLon = (room.location.longitude - longitude) * (Math.PI / 180);

        const lat1 = latitude * (Math.PI / 180);
        const lat2 = room.location.latitude * (Math.PI / 180);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = earthRadius * c;
        return distance <= radius;
    });

    res.status(200).json(successResponse("Rooms found!!", nearbyRooms));
});

const addRoom = asyncHandler(async (req, res) => {
    const { ownerName, description, images, latitude, price, longitude } = req.body;

    const room = new Room({
        ownerName,
        description,
        images,
        price,
        location: {
            latitude,
            longitude
        }
    });

    const createdRoom = await room.save();
    res.status(201).json(successResponse('Room added successfully!!', createdRoom));
});

const getIndividualRoomData = asyncHandler(async (req, res) => {
    const { roomid } = req.params;
    const room = await Room.findById(roomid);

    if (!room) {
        res.status(404);
        throw new Error("Room not found");
    }

    res.status(200).json(successResponse('Room found!',room));
});

module.exports = {
    getAllRoomsData,
    getNearbyRooms,
    addRoom,
    getIndividualRoomData
};
