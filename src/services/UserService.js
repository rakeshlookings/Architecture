const User = require('../models/UserModel')
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken')
const saltRounds = 10;


const create = async ({ body }) => {
    
    const plaintextPassword = body.password;
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(plaintextPassword, salt)
    let userObject = {
        firstName: body.firstName, lastName: body.lastName, email: body.email,role:'Reader',
        phone: body.phone, passwordHash: hash, createdAt: new Date(), updatedAt: new Date()
    }
    const object = new User(userObject)
    const newUser = await object.save()

    delete userObject.passwordHash
    delete userObject.createdAt
    delete userObject.updatedAt
    userObject._id = newUser._id
    const jwtToken = jwt.sign(userObject,process.env.JWT_KEY,{
        expiresIn:"1h"
    })
    return {
        status: true,
        token: jwtToken
    }
}

const login = async ({ body }) => {
    
    const plaintextPassword = body.password;
    const userInfo = await User.findOne({email:body.email})
    if (!userInfo) {
        throw new CustomError('Invalid credentials', 401)
    }
    const hashedPassword = userInfo.passwordHash

    const compare = await bcrypt.compare(plaintextPassword,hashedPassword)
    if (!compare) {
        throw new CustomError('Invalid credentials', 401)
    }
    const userObject = {
        email:userInfo.email,
        phone: userInfo.phone,
        role:userInfo.role,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        _id: userInfo._id
    }
    console.log(process.env.JWT_KEY)
    const jwtToken = jwt.sign(userObject,process.env.JWT_KEY,{
        expiresIn:"1h"
    })
    return {
        status: true,
        token: jwtToken
    }
}

const list = async ({ query }) => {
    
    const page = query?.page || 0
    const limit = query?.limit || 10

    const users = await User.find({},{passwordHash:0,createdAt:0,updatedAt:0}).skip(page * limit).limit(limit);
    return {
        status: true,
        users: users
    }
}

const getProfile = async ({ params }) => {
    
    const users = await User.findOne({_id: params.id},{passwordHash:0,createdAt:0,updatedAt:0})
    return {
        status: true,
        users: users
    }
}

const update = async ({ body,params }) => {
    
    const userObject = {
         updatedAt: new Date()
    }
    if (body.firstName){ userObject.firstName = body.firstName}
    if (body.lastName){ userObject.lastName = body.lastName}
    if (body.email){ userObject.email = body.email}
    if (body.phone){ userObject.phone = body.phone}
    
    const updateObj = await User.updateOne({_id:params.id},userObject)
    
    return {
        status: true,
        message: "updated successfully"
    }
}

const remove = async ({ body,params }) => {
    
    
    const updateObj = await User.deleteOne({_id:params.id})
    
    return {
        status: true,
        message: "updated successfully"
    }
}



module.exports = {
    create,
    login,
    list,
    getProfile,
    update,
    remove
}


