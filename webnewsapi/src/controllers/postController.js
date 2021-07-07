const POSTS = require('../model/post')
const USERS = require('../model/users')
const CATEGORIES =  require('../model/categories')

const PostController = {
    getPosts: async (req, res) => {
        try {
            const posts = await POSTS.find().populate('user','username').populate('category','name')
            if(!posts)
                return res.status(400).json({success: false, message: "Không có bài viết nào"})
            return res.json({posts})
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    },
    createPost: async (req, res) => {
        try {
            const {
                title,
                descriptions,
                content,
                images,
                category
            } =  req.body

            const id = req.id.id
            const user = await USERS.findById(id)
            const category_db = await  CATEGORIES.findOne({name: category})
            if(!category_db)
                return res.status(400).json({success: false, message: "Category không có"})

            const newPost = new POSTS({
                title,
                descriptions,
                content,
                images,
                category: category_db,
                user
            })

            await newPost.save()

            res.json({success: true, message: "Thêm post thành công"})

        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    },
    updatePost: async (req, res) => {
        try {
            const id_user = req.id.id
            const id_post = req.params.id

            const {
                title,
                descriptions,
                content,
                images,
                category
            } =  req.body

            const category_db = await CATEGORIES.findOne({name: category})

            const user = await USERS.findById(id_user)

            const condition = user.email === 'admin@admin.com' ? 
                                    {_id: id_post} : 
                                    {_id: id_post, user: id_user }

            const post = await POSTS.findOneAndUpdate(
                  condition,
                {
                    $set: {
                        title,
                        descriptions,
                        content,
                        images,
                        category: category_db
                    }
            })
            if(!post)
                return res.status(400).json({success: false, message: "Sửa không thành công"})
            return res.json({success: true, message: "Sửa thành công"})
            
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    },
    deletePost: async (req, res) => {
        try {

            const user = await USERS.findById(req.id.id)

            const condition = user.email === 'admin@admin.com' ? 
                                    {_id: req.params.id} : 
                                    {_id: req.params.id, user: req.id.id }

            const deletePost = await POSTS.findOneAndDelete(condition)

            if(!deletePost)
                return res.status(400).json({success: false, message: "Xoá không thành công"})

            res.json({success: true, message: "Xoá thành công"})
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    },
    getPost: async (req, res) => {
        try {
            const post = await POSTS.findOne({_id: req.params.id}).populate('user','username').populate('category','name')
            if(!post)
                return res.status(400).json({success: false, message: "Không có bài viết nào"})
            return res.json({post})
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    }
}

module.exports = PostController