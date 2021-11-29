const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        requried: true
    },
    body: {
        type: String,
        requried: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
    },
    tags: [String],
    category: {
        type: String,
        requried: true
    },
    subcategory: [String],

    deletedAt: { type: Date },
    isDeleted: {
        type: Boolean,
        default: false
    },
    publishedAt: { type: Date },
    isPublished: {
        type: Boolean,
        default: false
    }



}, { timestamps: true })
module.exports = mongoose.model('Blog', blogSchema)