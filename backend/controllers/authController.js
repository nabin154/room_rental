const User = require("../models/userModel");
const asyncHandler = require('express-async-handler');
const { successResponse, failedResponse } = require("../utils/apiResponse");

const registerUser = asyncHandler(async (req, res) => {

    const { name, email, image, password, latitude,longitude } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exist for given email !");
    }
    try {
        const user = await User.create({
            name,
            email,
            image,
            password,
            location: {
                latitude,
                longitude
            }
        });
        if (user) {
            res.status(201).json(successResponse('User created Successfully !', user));
        } else {
            res.status(400).json(failedResponse('Error while creating the user'));
        }

    } catch (err) {
        throw new Error('Internal server error while creating the User');
    }
});

const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(400);
            throw new Error("User doesn't exist for the given email!");
        }
        const isVerified = await user.comparePassword(password);
        if (isVerified) {
            const token = await user.generateToken();

            const response = {
                _id: user._id,
                name: user.name,
                email: user.email,
                token: token,
                image: user.image,
            };
            res.status(200).json(successResponse('Logged in successfully!', response));
        } else {
            res.status(400).json(failedResponse('Invalid credentials!'));
        }
    } catch (error) {
        throw new Error("Invalid email or password!")
    }
});







module.exports = { registerUser, loginUser  }