const passport = require('passport');
const { ApiError } = require('./apiError');
const httpStatus = require('http-status');
const { roles } = require('../config/roles');

const verify = (req, res, resolve, reject, rights) => async(err, user) => {
    if (err || !user) {
        return reject(new ApiError(httpStatus.UNAUTHORIZED, 'You are not authenticated'))
    }
    req.user = {
        _id: user._id,
        email: user.email,
        role: user.role,
        verified: user.verified
    }
    // console.log(req.user, 'in auth.verify');
    if (rights.length) {
        const action = rights[0]    //'createAny', etc
        const resource = rights[1]  //'user', 'article', etc
        const permission = roles.can(req.user.role) [action] (resource)
        if (!permission.granted) {
            return reject(new ApiError(httpStatus.FORBIDDEN, 'Insufficient rights'))
        }
        res.locals.permission = permission;
    }
    resolve();
}

const auth = (...rights) => async(req, res, next) => {
    return new Promise( (resolve, reject) => {
        passport.authenticate(
            'jwt', 
            {session: false}, 
            verify(req, res, resolve, reject, rights)
        ) (req, res, next)
    })
    .then( () => next() )           //resolve goes here
    .catch( (err) => next(err) )    //reject goes here
}

module.exports = auth;