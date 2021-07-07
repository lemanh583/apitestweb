const express = require('express')
const router = express.Router()
const userRouter = require('./userRoute')
const uploadRouter = require('./uploadRoute')
const categoryRouter = require('./categoriesRoute')
const postRouter = require('./postRoute')

router.use('/api',userRouter)

router.use('/api',uploadRouter)

router.use('/api/categories', categoryRouter)

router.use('/api/posts', postRouter)

module.exports = router