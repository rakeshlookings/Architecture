const UserService = require('../services/UserService')
const {errorHandler}  = require('../Utils/ErrorHandler')
const {authorize} = require('../Utils/authAndValidation')
const create = async(req,res) => {
    try {
        await authorize(req)
        const response = await UserService.create(req)
        return res.status(201).json(response)
    } catch(err) {
        const {errorObject, code} = errorHandler(err)
        return res.status(code).json(errorObject)
    }
}

const login = async(req,res) => {
    try {
        await authorize(req)
        const response = await UserService.login(req)
        return res.status(200).json(response)
    } catch(err) {
        const {errorObject, code} = errorHandler(err)
        return res.status(code).json(errorObject)
    }
}

const list = async(req,res) => {
    try {
        await authorize(req)
        const response = await UserService.list(req)
        return res.status(200).json(response)
    } catch(err) {
        const {errorObject, code} = errorHandler(err)
        return res.status(code).json(errorObject)
    }
}

const profile = async(req,res) => {
    try {
        await authorize(req)
        const response = await UserService.getProfile(req)
        return res.status(200).json(response)
    } catch(err) {
        const {errorObject, code} = errorHandler(err)
        return res.status(code).json(errorObject)
    }
}

const update = async(req,res) => {

    try {
        await authorize(req)        
        const response = await UserService.update(req)
        return res.status(201).json(response)
    } catch(err) {
        const {errorObject, code} = errorHandler(err)
        return res.status(code).json(errorObject)
    }
}

const remove = async(req,res) => {
    try {
        await authorize(req)
        const response = await UserService.remove(req)
        return res.status(200).json(response)
    } catch(err) {
        const {errorObject, code} = errorHandler(err)
        return res.status(code).json(errorObject)
    }
}

module.exports = {
   create,
   login,
   list,
   profile,
   update,
   remove
}
