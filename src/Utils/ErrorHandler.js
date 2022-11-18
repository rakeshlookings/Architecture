const errorHandler = (err) => {
    const errorObject = {
        message:err.message
    }
    const code = err?.code || 400
    console.log(err?.arr)
    if (err?.arr) {
        errorObject.arr = err?.arr
    }
    return {errorObject, code}
}

module.exports = {
    errorHandler
}