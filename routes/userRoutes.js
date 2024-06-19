const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.get('/stats', userController.getStats);

router.post('/submit', userController.submit);
router.put('/users/:id', userController.updateUser);
router.get('/users', authController.authMiddleware, userController.getUsers);
router.get('/userslist', userController.getUserssensor);
router.delete('/users/:id', authController.authMiddleware, userController.deleteUser);

module.exports = router;
