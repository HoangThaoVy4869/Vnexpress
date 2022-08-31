import bcrypt from "bcryptjs"
import db from '../models/index'

let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true
            })
            resolve(users);
        }
        catch (e) {
            reject(e)
        }
    })
}

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {

    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordByBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordByBcrypt,
                userName: data.userName,
                image: data.image
            })

            resolve('Create User successfully!!')
        }
        catch (e) {
            reject(e);
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e)
        }
    })
}

let getUserByUserId = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true
            })
            if (user) {
                resolve(user);
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



let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.email = data.email,
                    user.userName = data.userName,
                    user.image = data.image

                await user.save();

                let allUsers = await db.User.findAll();

                resolve(allUsers);
            } else {
                resolve();
            }
        }
        catch (e) {
            reject(e)
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (user) {
                await user.destroy();
            }
            resolve();
        }
        catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    getUserByUserId: getUserByUserId,
    updateUser: updateUser,
    deleteUserById: deleteUserById,
}