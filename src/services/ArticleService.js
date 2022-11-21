const Article = require('../models/ArticleModel')
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken')
const saltRounds = 10;


const create = async ({ body }) => {
    let articleObject = {
        category: body.category, title: body.title, content: body.content,likedCount:0, readCount:0, createdAt: new Date(), updatedAt: new Date()
    }
    const object = new Article(articleObject)
    const newArticle = await object.save()
    return {
        status: true,
        object: newArticle
    }
}


const list = async ({ query }) => {
    const page = query?.page || 0
    const limit = query?.limit || 10
    const articles = await Article.find({},{createdAt:0,updatedAt:0, content:0}).skip(page * limit).limit(limit);
    return {
        status: true,
        articles: articles
    }
}

const getOne = async ({ params },userId) => {
    const article = await Article.findOne({_id: params.id},{createdAt:0,updatedAt:0})
    const existViewed = await Article.count({_id: params.id, readBy : userId})
    if (!existViewed) {
        await Article.updateOne({_id: params.id}, { $inc: { readCount: 1 }, $push: { readBy: userId } })
    }
    return {
        status: true,
        users: article
    }
}

const update = async ({ body,params }) => {
    const articleObject = {
         updatedAt: new Date()
    }
    if (body.title){ articleObject.title = body.title}
    if (body.content){ articleObject.content = body.content}
    const updateObj = await Article.updateOne({_id:params.id},articleObject)
    return {
        status: true,
        message: "updated successfully"
    }
}


const markLiked = async ({ params }, userId) => {
    const existLikes = await Article.count({_id: params.id, likedBy : userId})
    if (!existLikes){
        const updateObj = await Article.updateOne({_id: params.id}, { $inc: { likedCount: 1 }, $push: { likedBy: userId } })
        return {
            status: true,
            message: "updated successfully"
        }
    }
    return {
        status: false,
        message: "already liked"
    }
}

const remove = async ({ body,params }) => {
    const updateObj = await Article.deleteOne({_id:params.id})
    return {
        status: true,
        message: "removed successfully"
    }
}



module.exports = {
    create,
    list,
    getOne,
    update,
    markLiked,
    remove
}


