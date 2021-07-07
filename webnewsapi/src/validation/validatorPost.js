const {validationResult, check} = require('express-validator')

const validatorResult = (req, res , next) => {

    const errorFormater = ({msg, param}) => {
        return `[${param}]: ${msg}`
    }

    const error = validationResult(req).formatWith(errorFormater)
    console.log(error)
    if(!error.isEmpty())
       return res.status(400).json({error: error.array()})
    next()
}


const validatorPost = [
    check('title')
        .notEmpty()
        .withMessage("Không được bỏ trống title"),
    check('descriptions')
        .notEmpty()
        .withMessage("Không được bỏ trống descriptions"),
    check('content')
        .notEmpty()
        .withMessage("Không được bỏ trống content")
]

module.exports = {
    validatorPost, validatorResult
}