const { User } = require('../models/user');
const { ApiError } = require('../middleware/apiError');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
require ('dotenv').config();

const findUserEmail = async(email) => {
    return await User.findOne({email});
}

const findUserById = async(_id) => {
    console.log( 'in findUserById');
    return await User.findById(_id);
}

const updateUserProfile = async(req) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.user._id},
            {
                "$set": {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    age: req.body.age
                }
            },
            { new: true}
        )
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, 'User not found: updateUserProfile')
        }
        return user;
        
    } catch(err) {
        throw err
    }
}

const updateEmail = async(req) => {
    try {
        // console.log(req.body.newemail, 'in updateEmail')
        if (await User.emailTaken(req.body.newemail)) {
            throw new ApiError(httpStatus.NOT_FOUND, "Email taken")
        }
        const user = await User.findOneAndUpdate(
            {_id: req.user._id, email: req.user.email},
            {
                "$set": {
                    email: req.body.newemail,
                    verified: false
                }
            },
            {new: true}
        )
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, "User not found: updateEmail")
        }
        return user;

    } catch(err) {
        throw err
    }
}

const validateToken = (token) => {
    return jwt.verify(token, process.env.DB_SECRET)
}

module.exports = {
    findUserEmail,
    findUserById,
    updateUserProfile,
    updateEmail,
    validateToken
}