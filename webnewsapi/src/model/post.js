const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    descriptions: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    images: {
        type: Object,
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "categories"
    }
},{timestamps: true})

module.exports = mongoose.model('posts', PostSchema)