const errorHandler = (err) => {
    let message = err?.message
    let code = err?.code || 400
    if (message == 'jwt expired'){
        message = 'Session expired please login again'
        code = 401
    }
    const errorObject = {
        message
    }
    if (err?.arr) {
        errorObject.arr = err?.arr
    }
    return {errorObject, code}
}

module.exports = {
    errorHandler
}