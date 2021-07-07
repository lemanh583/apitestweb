const USERS = require('../model/users')

const checkAdmin = async (req, res, next) => {
    try {
        // console.log(req.id.id)
        const id = req.id.id
        const admin = await USERS.findById(id)
        // console.log(admin)
        if(!admin)
            return res.status(400).json({success: false})
        if(admin.email !== "admin@admin.com")
            return res.status(401).json({success: false, message: "Xác thực không hợp lệ"})
        next()
    } catch (error) {
        return res.status(400).json({success: false, message: error.message})
    }
}

module.exports = checkAdmin