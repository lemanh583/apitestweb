const  {removefolderTemp} = require('../controllers/uploadController')

const validatorUpload = (req, res, next) => {
    // console.log(req.files)
    if(!req.files || Object.keys(req.files).length === 0)
        return res.status(400).json({success: false, message: "Không có hình ảnh nào được chọn"})
    
    const file = req.files.file
    if(file.size > 1024*1024){
        removefolderTemp(file.tempFilePath)
        return res.status(400).json({success: false, message: "File quá lớn"})
    }
    if(file.mimetype != 'image/png' && file.mimetype != 'image/jpeg' && file.mimetype != 'image/jpg'){
        removefolderTemp(file.tempFilePath)
        return res.status(400).json({success: false, message: "Chưa đúng định dạng"})
    }
    next()
}

module.exports = validatorUpload