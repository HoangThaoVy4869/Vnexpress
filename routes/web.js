import express from 'express';
import adminController from '../controllers/adminController';
import newsController from '../controllers/newsController';
import multer from 'multer';
import path from 'path';
var appRoot = require('app-root-path');
let router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + '/public/images/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter })

let initWebRoutes = (app) => {
    router.get('/', newsController.getNews);
    router.get('/admin', adminController.getHomePage);

    router.get('/addUser', adminController.getAddUser);
    router.post('/post-addUser', adminController.postAddUser);

    router.get('/editUser', adminController.getEditUser);
    router.post('/post-editUser', adminController.postEditUser);

    router.get('/deleteUser', adminController.deleteUser);

    router.get('/news', newsController.getListNews);

    router.get('/addNews', newsController.getAddNews);
    router.post('/post-addNews', upload.single('image'), newsController.postAddNews);

    router.get('/editNews', newsController.getEditNews);
    router.post('/post-editNews', newsController.postEditNews);

    router.get('/deleteNews', newsController.deleteNews);

    return app.use("/", router);
}
module.exports = initWebRoutes;