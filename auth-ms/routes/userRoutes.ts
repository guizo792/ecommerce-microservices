const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

// Authentication
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// Forgetting & Reseting password
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Updating current user password
router.patch(
  '/updateMyPassword/',
  authController.protect,
  authController.updatePassword
);

// Updating current user data
router.patch('/updateMe', authController.protect, userController.updateMe);

// Updating current user data
router.delete('/deleteMe', authController.protect, userController.deleteMe);

// Getting all users
router.route('/').get(authController.protect, userController.getAllUsers);

module.exports = router;
