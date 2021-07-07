const express = require('express')
const router = express.Router()
const PostController = require('../controllers/postController')
const auth = require('../middleware/auth')

router.route('/')
        .get(PostController.getPosts)
        .post(auth, PostController.createPost)

router.route('/:id')
        .put(auth, PostController.updatePost)
        .delete(auth, PostController.deletePost)
        .get(PostController.getPost)




module.exports = router