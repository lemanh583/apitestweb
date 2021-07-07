const {validationResult, check} = require('express-validator')
const USERS = require('../model/users')
const bcrypt = require('bcrypt')

exports.validatorResult = (req, res , next) => {

    const errorFormater = ({msg, param}) => {
        return `[${param}]: ${msg}`
    }

    const error = validationResult(req).formatWith(errorFormater)
    console.log(error)
    if(!error.isEmpty())
       return res.status(400).json({error: error.array()})
    next()
}


exports.validatorRegister = [
    check("username")
        .notEmpty()
        .withMessage('username không được để trống')
        .isLength({min: 5, max: 50})
        .withMessage('username phải lớn hơn 5 ký tự'),
    check('email')
        .notEmpty()
        .withMessage("email không được để trống")
        .isEmail()
        .withMessage('email chưa chính xác')
        .custom(async value => {
            const user =  await USERS.findOne({email: value})
            if(user)
                throw new Error("Email đã tồn tại")
            return true
        }),
    check('password')
        .notEmpty()
        .withMessage("password không được để trống")
        .isLength({min: 5})
        .withMessage("Mật khẩu phải lớn hơn 5 ký tự"),
    check('confirm_password')
        .notEmpty()
        .withMessage("không được bỏ trống")
        .custom((value, {req}) => {
            if(value !== req.body.password)
                throw new Error("Mật khẩu chưa khớp")
            return true
        })
]

exports.validatorLogin = [
    check('email')
        .notEmpty()
        .withMessage("email không được để trống")
        .isEmail()
        .withMessage('email chưa chính xác')
        .custom(async value => {
            const user =  await USERS.findOne({email: value})
            if(!user)
                throw new Error("Sai tài khoản hoặc mật khẩu")

        }).bail(),
    check('password')
        .notEmpty()
        .withMessage("password không được để trống")
        .isLength({min: 5})
        .withMessage("Mật khẩu phải lớn hơn 5 ký tự")
       
        .custom(async (value,{ req }) => {
            const user = await USERS.findOne({email: req.body.email})
            // if(!user)
            //     throw new Error("Sai tài khoản hoặc mật khẩu")
            const passwordAccess = await bcrypt.compare(value, user.password)

            if(!passwordAccess)
                throw new Error("Sai tài khoản hoặc mật khẩu")
            return true

        })
]

