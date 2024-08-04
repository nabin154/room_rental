const express = require("express");
const { loginValidation, registerValidation } = require("../validation/authValidation");
const { registerUser, loginUser } = require("../controllers/authController");
const router = express.Router();


router.route('/register').post(registerValidation, registerUser);
router.route('/login').post(loginValidation, loginUser);


module.exports = router;