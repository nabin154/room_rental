const express = require("express");
const { getAllRoomsData, getNearbyRooms, addRoom, getIndividualRoomData } = require("../controllers/roomController");
const { getNearByRoomsValidation, addRoomValidation, getIndividualRoomDataValidation } = require("../validation/roomValidation");
const router = express.Router();


router.route('/').get( getAllRoomsData);
router.route('/nearbyrooms').get( getNearByRoomsValidation ,getNearbyRooms);
router.route('/addroom').post( addRoomValidation ,addRoom);
router.route('/:roomid').get(getIndividualRoomDataValidation, getIndividualRoomData);


module.exports = router;