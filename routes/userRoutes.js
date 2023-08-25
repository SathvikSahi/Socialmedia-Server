const express = require('express');
const userRouter = express.Router();

const verifyToken = require('../middleware/authorize');

const {
    getUser,
    getUserFriends,
    addRemoveFriend 
} = require('../controllers/userController');

userRouter.get('/:id', verifyToken, getUser);
userRouter.get('/:id/friends', verifyToken, getUserFriends);
userRouter.patch('/:id/:friendId', verifyToken, addRemoveFriend);

module.exports = userRouter;