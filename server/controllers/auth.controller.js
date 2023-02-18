const {authService, emailService} = require('../services');
const httpStatus = require('http-status');

const authController = {
    async register(req, res, next) {
        try {
            const { email, password} = req.body;
            console.log(email, password, 'in authController.register');
            const user = await authService.createUser(email, password);
            const token = await authService.genAuthToken(user);
            
            //send verification email
            await emailService.registerEmail(email, user);

            //set cookie and return user
            res.cookie('access-token', token)
                .status(httpStatus.CREATED)
                .send({
                    user,
                    token
                })
            res.json(user)

        } catch(err) {
            // res.status(httpStatus.BAD_REQUEST)
            //     .send(err.message)
            next(err)  //middleware handles error
        }
    },

    async signin(req, res, next) {
        try {
            const {email, password} = req.body;
            const user = await authService.signinEmail(email, password);
            token = await authService.genAuthToken(user);
            res.cookie('access-token', token)
                .send({user, token})
        
        } catch (err) {
            next(err);
        }
    },

    async isauth(req, res, next) {
        res.json(req.user)
    },
    async testrole(req, res, next) {
        res.json({ok:'yes'})
    }
}
module.exports = authController;