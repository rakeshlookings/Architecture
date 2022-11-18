const validator = require("email-validator");
const validationJson = require('./validation.json')
const validate = async (body,type) => {
    const errors = []
    const criteriaObject = validationJson[type]

    if (criteriaObject && typeof criteriaObject === 'object' && Object.keys(criteriaObject).length) {
        for (let x of Object.keys(criteriaObject)) {
            if (body[x] && typeof body[x] === 'string') {
                const error = await stringValidation(criteriaObject[x],body[x],String(x))
                if (error === "Correct_format") {
                    continue
                }
                errors.push(error)
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
                    return `${parameter} is not in properformat`
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