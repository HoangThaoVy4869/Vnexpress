import newsService from '../services/newsService'
import multer from 'multer'
let getListNews = async (req, res) => {
    try {
        let data = await newsService.getListNews();
        console.log(data)
        return res.render('news/listNews.ejs', {
            data: data
        })
    }
    catch (err) {
        console.log(err);
    }
}

let handleUploadFile = async (req, res) => {
    let upload = multer({ storage: storage, fileFilter: imageFilter }).single('image');
    upload(req, res, function (err) {

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
    });

}



let getNews = async (req, res) => {
    try {
        let data = await newsService.getListNews();
        console.log(data)
        return res.render('vnexpress.ejs', {
            data: data,
            layout: false
        })
    }
    catch (err) {
        console.log(err);
    }
}

let getAddNews = (req, res) => {
    return res.render('news/addNews.ejs')
}

let postAddNews = async (req, res) => {
    let message = await newsService.createNews(req.body)
    let data = await newsService.getListNews();;
    console.log(message)
    return res.render('news/listNews.ejs', {
        data: data
    })
}


let getEditNews = async (req, res) => {
    let newsId = req.query.id;
    if (newsId) {
        let newsData = await newsService.getNewsById(newsId);
        return res.render('news/editNews.ejs', {
            news: newsData
        })
    }
    else {
        return res.send('News not found!');
    }

}

let postEditNews = async (req, res) => {
    let data = req.body;
    let allNews = await newsService.updateNews(data);
    return res.render('news/listNews.ejs', {
        data: allNews
    })
}

let deleteNews = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await newsService.deleteNewsById(id);
        return res.redirect("/news")
    }
    else {
        return res.send('Delete failed');
    }
}


module.exports = {
    getListNews: getListNews,
    getAddNews: getAddNews,
    postAddNews: postAddNews,
    postEditNews: postEditNews,
    getEditNews: getEditNews,
    deleteNews: deleteNews,
    getNews: getNews,
    handleUploadFile: handleUploadFile
}