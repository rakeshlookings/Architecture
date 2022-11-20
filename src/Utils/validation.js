const validator = require("email-validator");
const validationJson = require('./validation.json')
const validate = async (req) => {
    let url = req.originalUrl
    const body = req.body
    const errors = []
    url = url.split('/')
    url = url.slice(3,url.length)
    let criteriaObject = validationJson[url[0]]
    if (criteriaObject && url[1]){
        criteriaObject = criteriaObject[url[1]]
    }
    console.log('xx',criteriaObject)
    // return errors
    if (!criteriaObject) {
        return errors
    }

    if (criteriaObject && typeof criteriaObject === 'object' && Object.keys(criteriaObject).length) {
        for (let x of Object.keys(criteriaObject)) {
            if (body[x] && typeof body[x] === 'string') {
                const error = await stringValidation(criteriaObject[x],body[x],String(x))
                if (error === "Correct_format") {
                    continue
                }
                errors.push(error)
            }
            if (!body[x] && criteriaObject[x]?.exists ) {
                errors.push(`${x} is required`)
            }
        }
    }
    return errors
}

const stringValidation = (criteria, string, parameter) => {
    
    if (criteria.exists && !string) {
        return `${parameter} not provided`
    }
    if (string && criteria.max && string.length > Number(criteria.max)) {
        return `${parameter} should be of maximum ${criteria.max}`
    }
    if (string &&  criteria.max && string.length < Number(criteria.min)) {
        return `${parameter} should be of minimum ${criteria.min}`
    }
    if (string && criteria.exact && string.length !== Number(criteria.exact)) {
        return `${parameter} should be exact ${criteria.exact} length`
    }
    if (string && criteria.format) {
        switch (criteria.format) {
            case 'email':
                if(!validator.validate(string)) {
                    return `${parameter} is not in proper format`
                }
                return "Correct_format"
            default:
                return "Correct_format"     
        }
    }
    return "Correct_format"
}

module.exports = {
    validate
}