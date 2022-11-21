const ArticleService = require('../services/ArticleService')
const {validate} = require('../Utils/validation')
const {readerAuth, adminAuth, readerIDSpecificAuth} = require('../Utils/auth')
const {CustomError} = require('../CustomClasses/CustomError')
const {errorHandler}  = require('../Utils/ErrorHandler')
const {authorize} = require('../Utils/authAndValidation')

const create = async(req,res) => {
    try {
        await authorize(req)
        const response = await ArticleService.create(req)
        return res.status(201).json(response)
    } catch(err) {
        const {errorObject, code} = errorHandler(err)
        return res.status(code).json(errorObject)
    }
}


const list = async(req,res) => {
    try {

        await authorize(req)
        const response = await ArticleService.list(req)
        return res.status(200).json(response)
    } catch(err) {
        const {errorObject, code} = errorHandler(err)
        return res.status(code).json(errorObject)
    }
}

const getOne = async(req,res) => {
    try {
        const auth = await authorize(req)
        const response = await ArticleService.getOne(req,  auth._id)
        return res.status(200).json(response)
    } catch(err) {
        const {errorObject, code} = errorHandler(err)
        return res.status(code).json(errorObject)
    }
}

const update = async(req,res) => {
    try {

        await authorize(req)
        const response = await ArticleService.update(req)
        return res.status(201).json(response)
    } catch(err) {
        const {errorObject, code} = errorHandler(err)
        return res.status(code).json(errorObject)
    }
}

const markLiked = async(req,res) => {
    try {
        const auth = await authorize(req)
        const response = await ArticleService.markLiked(req,auth._id)
        return res.status(200).json(response)
    } catch(err) {
        const {errorObject, code} = errorHandler(err)
        return res.status(code).json(errorObject)
    }
}

const remove = async(req,res) => {
    try {
        await authorize(req)
        const response = await ArticleService.remove(req)
        return res.status(200).json(response)
    } catch(err) {
        const {errorObject, code} = errorHandler(err)
        return res.status(code).json(errorObject)
    }
}

module.exports = {
   create,
   markLiked,
   list,
   getOne,
   update,
   remove
}
