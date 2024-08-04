const Joi = require('joi');


const getNearByRoomsValidationSchema = Joi.object({
    latitude: Joi.string().required(),
    longitude: Joi.string().required(),

});
const getIndividualRoomDataValidationSchema = Joi.object({
    roomid: Joi.string().required(),
});


const addRoomValidationSchema = Joi.object({
    ownerName: Joi.string().required(),
    images: Joi.array().items(Joi.string().uri()),
    address: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    latitude: Joi.string().required(),
    longitude: Joi.string().required(),
});



const getNearByRoomsValidation = (req, res, next) => {
    const { error } = getNearByRoomsValidationSchema.validate(req.query);
    if (error) {
        res.status(400);
        return next(error);
    }
    next()
};
const getIndividualRoomDataValidation = (req, res, next) => {
    const { error } = getIndividualRoomDataValidationSchema.validate(req.params);
    if (error) {
        res.status(400);
        return next(error);
    }
    next()
};

const addRoomValidation = (req, res, next) => {
    const { error } = addRoomValidationSchema.validate(req.body);
    if (error) {
        res.status(400);
        return next(error);
    }
    next()
};


module.exports = { getNearByRoomsValidation, addRoomValidation, getIndividualRoomDataValidation }