const UserService = require('../services/UserService')
const {validate} = require('../Utils/validation')
const {readerAuth, adminAuth, readerIDSpecificAuth} = require('../Utils/auth')
const {CustomError} = require('../CustomClasses/CustomError')
const {errorHandler}  = require('../Utils/ErrorHandler')

const create = async(req,res) => {
    try {
        const error = await validate(req.body,'signUp')
        if (error.length) {
            throw new CustomError('Bad format', 400,error)
        }
        
        const response = await UserService.create(req)
        return res.status(201).json(response)
    } catch(err) {
        const {errorObject, code} = errorHandler(err)
        return res.status(code).json(errorObject)
    }
}

const login = async(req,res) => {
    try {
        const error = await validate(req.body,'signIn')
        if (error.length) {
            throw new CustomError('Bad format', 400,error)
        }
        
        const response = await UserService.login(req)
        return res.status(200).json(response)
    } catch(err) {
        const {errorObject, code} = errorHandler(err)
        return res.status(code).json(errorObject)
    }
}

const list = async(req,res) => {
    try {

        const auth = await adminAuth(req)
        console.log(auth,'auth')
        if (!auth) {
            throw new CustomError('Not authorized', 401)
        }
        
        const response = await UserService.list(req)
        return res.status(200).json(response)
    } catch(err) {
        const {errorObject, code} = errorHandler(err)
        return res.status(code).json(errorObject)
    }
}

const profile = async(req,res) => {
    try {

        const auth = await readerIDSpecificAuth(req)
        if (!auth) {
            throw new CustomError('Not authorized', 401)
        }
        
        const response = await UserService.getProfile(req)
        return res.status(200).json(response)
    } catch(err) {
        const {errorObject, code} = errorHandler(err)
        return res.status(code).json(errorObject)
    }
}

const update = async(req,res) => {
    try {

        const auth = await readerIDSpecificAuth(req)
        if (!auth) {
            throw new CustomError('Not authorized', 401)
        }

        const error = await validate(req.body,'update')
        if (error.length) {
            throw new CustomError('Bad format', 400,error)
        }
        
        const response = await UserService.update(req)
        return res.status(201).json(response)
    } catch(err) {
        const {errorObject, code} = errorHandler(err)
        return res.status(code).json(errorObject)
    }
}

const remove = async(req,res) => {
    try {

        const auth = await readerIDSpecificAuth(req)
        if (!auth) {
            throw new CustomError('Not authorized', 401)
        }
        
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
