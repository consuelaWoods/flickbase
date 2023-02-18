const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apiError');

const { userService, authService, emailService } = require('../services');

const userController = {
    async profile (req, res, next) {
        console.log(req.user._id, 'in userController.profile')
        try {
            const user = await userService.findUserById(req.user._id);
            if (!user) {
                throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
            }
            res.json(res.locals.permission.filter(user._doc))   //filter out what roles restrict
        } catch(err) {
            next(err)
        }
    },
    async updateProfile(req, res, next) {
        try {
            const user = await userService.updateUserProfile(req)
            res.json(res.locals.permission.filter(user._doc))
        } catch(err) {
            next(err)
        }
    },
    async updateUserEmail(req, res, next) {
        //update user email
        //generate new token
        // console.log(req.user, 'in updateUserEmail')
        try {
            const user = await userService.updateEmail(req)
            const token = await authService.genAuthToken(user)

            //send email for verification
           await emailService.registerEmail(user.email, user);

            res.cookie('access-token', token)
                .send({
                    user: res.locals.permission.filter(user._doc),
                    token
                })

        } catch(err) {
            next(err)
        }
    },
    async verifyAcct(req, res, next) {
        try {
            const token = userService.validateToken(req.query.validation)
            const user = await userService.findUserById(token.sub);
            if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
            if (user.verified) throw new ApiError(httpStatus.NOT_FOUND, 'Accout already verified');
            
            user.verified = true;
            user.save();
            res.status(httpStatus.CREATED)
                .send({
                    email: user.email,
                    verified: true
                })
        } catch(err) {
            next(err)
        }
    }
};

module.exports = userController;