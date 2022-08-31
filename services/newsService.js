import db from '../models/index'
import handleUploadFile from '../controllers/newsController'
let getListNews = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let news = await db.News.findAll({
                raw: true
            })
            resolve(news);
        }
        catch (e) {
            reject(e)
        }
    })
}

let createNews = async (data) => {

    return new Promise(async (resolve, reject) => {
        try {
            await db.News.create({
                title: data.title,
                metaTitle: data.metaTitle,
                slug: data.slug,
                summary: data.summary,
                content: data.content,
                image: data.image,
                author: data.author,
                categoryId: data.categoryId,
            })

            resolve('Create News successfully!!')
        }
        catch (e) {
            reject(e);
        }
    })
}

let getNewsById = (newsId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let news = await db.News.findOne({
                where: { id: newsId },
                raw: true
            })
            if (news) {
                resolve(news);
            }
            else {
                resolve([]);
            }
        }
        catch (e) {
            reject(e)
        }
    })
}



let updateNews = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let news = await db.News.findOne({
                where: { id: data.id }
            })
            if (news) {

                news.title = data.title,
                    news.metaTitle = data.metaTitle,
                    news.slug = data.slug,
                    news.summary = data.summary,
                    news.content = data.content,
                    news.image = data.image,
                    news.author = data.author,
                    news.categoryId = data.categoryId,

                    await news.save();

                let allNews = await db.News.findAll();
                resolve(allNews);
            } else {
                resolve();
            }
        }
        catch (e) {
            reject(e)
        }
    })
}

let deleteNewsById = (newsId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let news = await db.News.findOne({
                where: { id: newsId }
            })
            if (news) {
                await news.destroy();
            }
            resolve();
        }
        catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getListNews: getListNews,
    createNews: createNews,
    getNewsById: getNewsById,
    updateNews: updateNews,
    deleteNewsById: deleteNewsById,

}