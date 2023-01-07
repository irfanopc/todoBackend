const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require('dotenv').config();


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter a email'],
        unique: [true, 'Email already exits'],
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        select: false,
    },


    tasks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'task'
        }]


});
userSchema.pre('save', async function (next) {
    if (this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = function () {
    return jwt.sign({_id:this._id}, process.env.JWT_SECRET)
}
const User = mongoose.model('user', userSchema);

module.exports = User;