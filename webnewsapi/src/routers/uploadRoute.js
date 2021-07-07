const express = require('express')
const router = express.Router()
const validatorUpload = require('../validation/validatorUpload')
const {uploadController} = require('../controllers/uploadController')


router.post('/upload',validatorUpload, uploadController.upload)

router.post('/destroy',uploadController.destroy)

module.exports = router