const mongoose = require('mongoose')
const { Schema } = require('mongoose')


const userSchema = new Schema({
    firstName: String,
    secondName: String,
    email: String,
    phone: String,
    passwordHash: String,
    role: String,
    createdAt: Number,
    updatedAt: Number

})

const User = mongoose.model('User', userSchema)

module.exports = User
