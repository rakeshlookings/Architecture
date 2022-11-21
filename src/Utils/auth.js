const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()
const jwtSecretKey = process.env.JWT_KEY
const readerAuth = (req) => {
    const tokenAuth = req.header('authorization')
    if (!tokenAuth) { return false }
    const verified = jwt.verify(tokenAuth, jwtSecretKey)
    if (verified.role === 'Reader' || verified.role === 'Admin') {
        return verified
    }
    return false
}

const adminAuth = (req) => {
    
    const tokenAuth = req.header('authorization')
    
    if (!tokenAuth) { return false }
    const verified = jwt.verify(tokenAuth, jwtSecretKey)
    
    if (verified.role === 'Admin') {
        return verified
    }
    return false
}

const readerIDSpecificAuth = (req) => {
    const tokenAuth = req.header('authorization')
    if (!tokenAuth) { return false }
    const verified = jwt.verify(tokenAuth, jwtSecretKey)
    if (verified.role === 'Admin') {
        return verified
    }
    if (verified.role === 'Reader'){
        let paramsId = req.url
        const arr = paramsId.split('/')
        if (arr.length === 3){
            paramsId = arr[2]
            if (paramsId === verified._id){
                return verified
            }
        }
    }
    return false
}

module.exports = {
    readerAuth,
    adminAuth,
    readerIDSpecificAuth
}