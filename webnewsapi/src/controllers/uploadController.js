const cloudinary = require('cloudinary')
const fs = require('fs')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const uploadController ={
    upload: async (req, res) => {
        try {
            const file = req.files.file
            await cloudinary.v2.uploader.upload(file.tempFilePath, { folder: 'news'}, async (error, result) => {
                if(error)
                    throw error
                removefolderTemp(file.tempFilePath)
                res.json({public_id: result.public_id, url: result.secure_url})
            })
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    },
    destroy:  (req, res) => {
        try {
            const {public_id} = req.body
            if(!public_id)
                return res.status(400).json({success: false, message: "Không có ảnh được chọn"})
            cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
                if(err) throw err
                res.json({success: true, message: "Xoá thành công"})
            })
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    }
}

const removefolderTemp = (path) => {
    fs.unlink(path, err => {
        if(err) throw err
    })
}

module.exports = {uploadController, removefolderTemp }