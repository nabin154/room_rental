const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: {type: String , required : true},
    role: { type: String, default: 'user' },
    image: { type: String },
    location: {
        latitude: { type: String },  
        longitude: { type: String }  
    }
},
    {
        timestamps: true,
        collection: 'users' 
    });

const User = mongoose.model("User", userSchema);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

});


userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.generateToken = async function () {
    try {
        return await jwt.sign(

            {
                _id: this._id,
                email: this.email,
            },
            JWT_ACCESS_TOKEN,
            {
                expiresIn: "10m"
            },
        );
    } catch (err) {
        console.error(err);
    }

};

module.exports = User;
