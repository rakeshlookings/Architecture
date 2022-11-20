const {adminAuth, readerAuth, readerIDSpecificAuth} = require('./auth')
const permission = require('./Permission.json')
const {validate} = require('./validation')
const {CustomError} = require('../CustomClasses/CustomError')
const authorize = async (req) => {
    let url = req.originalUrl
    url = url.split('/')
    url = url.slice(3,url.length)
    let perm = permission[url[0]]
    if (perm && url[1]){
        perm = perm[url[1]]
    }
    if (!perm) {
        throw new CustomError('Uknown route', 404)
    }
    let verified = false
    switch (perm) {
        case 'zeroAuth':
            verified = true
            break;
        case 'adminAuth':
             verified = await adminAuth(req)
        case 'readerAuth':
            verified = await readerAuth(req)
        case 'readerIDSpecificAuth':
            verified = await readerIDSpecificAuth(req)    
        default:
            break;
    }
    const errors = await validate(req)
    if (!verified) {
        throw new CustomError('Not Authorized', 401)
    }
    console.log(errors)
    if (errors.length){
        throw new CustomError('Bad format', 400, errors)
    }
    return verified
}

module.exports = {
    authorize
}