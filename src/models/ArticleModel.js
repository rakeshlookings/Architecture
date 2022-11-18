const mongoose = require('mongoose')
const { Schema } = require('mongoose')


const articleSchema = new Schema({
    category: String,
    title: String,
    content: String,
    readBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    readCount: Number,
    likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    likedCount: Number,
    createdAt: Number,
    updatedAt: Number
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article
