const {validationResult, check} = require('express-validator')
const USERS = require('../model/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const UserController = {
    register: async (req, res) => {
        try {
            const {username, email, password } = req.body
        
            const hashPassword = await bcrypt.hash(password, 12)
    
            const newUser = new USERS ({
                username,
                email,
                password: hashPassword
            })
            await newUser.save()
            const token = createAccessToken({id: newUser._id})
            
            return res.status(200).json({success: true, message:'Đăng ký thành công', token})
            
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    },
    login: async (req, res) => {
        try {
            const {email, password} = req.body
            
            const user = await USERS.findOne({email})

            const token = createAccessToken({id: user._id})

            res.status(200).json({success: true, message: "Đăng nhập thành công", token})

        } catch (error) {
            
        }
    },
    getUsers: async (req, res) => {
        try {
            const users = await USERS.find({})

            return res.status(200).json({users})

        } catch (error) {
            return res.status(400).json({success: false, message: error.message})        }
    },
    getUser: async (req, res) => {
        try {
            const id = req.params.id
            const user =  await USERS.findOne({_id: id}).select('-password')
            if(!user)
                return res.status(400).json({success: false, message: "Không tồn tại user"})
            return res.status(200).json({user})
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    },
    deleteUser: async (req, res) => {
        try {
            const id = req.params.id
            await USERS.findOneAndDelete({_id: id})
            return res.status(200).json({success: true, message: "Xoá user thành công"})
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    },
    updateUser: async (req, res) => {
        try {
            const id = req.params.id
            const {username, email } = req.body

            const updateUser = await USERS.findByIdAndUpdate(id, {$set: {username, email} })

            if(!updateUser)
                return res.status(400).json({success: false, message: "Cập nhật không thành công"})
            return res.status(200).json({success: true, message: "Cập nhập thành công"})

        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    }
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,{expiresIn: '7d'})
}

module.exports = UserController