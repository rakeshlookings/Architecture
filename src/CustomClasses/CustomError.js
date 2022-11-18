class CustomError extends Error {
    constructor(message,code,arr) {
        super(message);
        this.code = code;
        this.arr = arr
    }
}

module.exports = {
    CustomError
}