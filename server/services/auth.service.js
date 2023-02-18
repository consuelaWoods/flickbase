const httpStatus = require('http-status');

// MODELS
const { User } = require('../models/user')

// SERVICES
const userService = require('./user.service');

// MIDDLEWARE
const { ApiError } = require('../middleware/apiError');


const createUser = async(email, password) => {
    try {
        //check the email
        if (await User.emailTaken(email)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email taken');
        }

        //hash password in userSchema and save to db
        const user = new User({
            email,
            password
        });
        await user.save();
        return user;

    } catch (err) {
        throw err;
    }
}

const genAuthToken = (user) => {
    const token = user.generateAuthToken();
    return token;
}

const signinEmail = async (email, password) => {
    try {
        const user = await userService.findUserEmail(email);
        if (!user) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Bad Email');
        }
        if (!(await user.comparePassword(password))) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Passwords do not match');
        }
        return user;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createUser,
    genAuthToken,
    signinEmail
}