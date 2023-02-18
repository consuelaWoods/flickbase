const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

//MIDDLEWARE
const auth = require('../middleware/auth');

// .../api/users/profile
router.route('/profile')
    // .get(auth('readOwn','profile'), //check roles, return user if good
    //     userController.profile)
    .get(auth('readOwn','profile'),userController.profile)
    .patch(auth('updateOwn', 'profile'), userController.updateProfile)

router.patch('/email', auth('readOwn', 'profile'), userController.updateUserEmail)
router.get('/verify', userController.verifyAcct)


module.exports = router;