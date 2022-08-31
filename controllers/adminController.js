import CRUDService from '../services/CRUDService'
let getHomePage = async (req, res) => {
    try {
        let data = await CRUDService.getAllUsers();
        console.log(data)
        return res.render('content.ejs', {
            data: data
        })
    }
    catch (err) {
        console.log(err);
    }
}

let getAddUser = (req, res) => {
    return res.render('user/addUser.ejs')
}

let postAddUser = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body)
    let data = await CRUDService.getAllUsers();
    console.log(message)
    return res.render('content.ejs', {
        data: data
    })
}


let getEditUser = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserByUserId(userId);
        return res.render('user/editUser.ejs', {
            user: userData
        })
    }
    else {
        return res.send('User not found!');
    }

}

let postEditUser = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUser(data);
    return res.render('content.ejs', {
        data: allUsers
    })
}

let deleteUser = async (req, res) => {
    let id = req.query.id;
    let data = await CRUDService.getAllUsers();
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.redirect("/")
    }
    else {
        return res.send('Delete failed');
    }
}


module.exports = {
    getHomePage: getHomePage,
    getAddUser: getAddUser,
    postAddUser: postAddUser,
    getEditUser: getEditUser,
    postEditUser: postEditUser,
    deleteUser: deleteUser
}