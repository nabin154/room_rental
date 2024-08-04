const express = require("express");
const router = express.Router();


router.route('/').get( getAllRoomsData);
router.route('/nearbyrooms').get( getNearbyRooms);
router.route('/addroom').post( addRoom);
router.route('/:roomid').get(getIndividualRoomData);


module.exports = router;