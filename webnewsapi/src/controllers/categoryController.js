const { update } = require('../model/categories')
const CATEGORIES = require('../model/categories')

const categoryController = {
    getCategories: async (req, res) => {
        try {
            const categories = await CATEGORIES.find()
            if(!categories)
                return res.status(400).json({success: false, message: "Không có category"})
            return res.json({categories})
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    },
    createCategory: async (req, res) => {
        try {
            const {name} = req.body
            const newCategory = new CATEGORIES({
                name
            })
            await newCategory.save()

            return res.json({success: true, message: "thêm thành công"})

        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    },
    updateCategory: async (req, res) => {
        try {
            const {name} = req.body
            const id = req.params.id

            const updateCategory = await CATEGORIES.findByIdAndUpdate(id,{$set:{name}})
            if(!updateCategory)
                return res.status(400).json({success: false, message: "Sửa thất bại"})
            return res.json({success: true, message: "Sửa thành công"})

        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const id = req.params.id
            await CATEGORIES.findByIdAndDelete(id)
            return res.json({success: true, message: "Xoá thành công"})
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    }
}

module.exports = categoryController