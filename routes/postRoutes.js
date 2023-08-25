const express = require('express');
const postRouter = express.Router();

const verifyToken = require('../middleware/authorize');

const {
    getFeedPosts,
    getUserPosts,
    likePost,
    createPost
} = require('../controllers/postController');

postRouter.get('/', verifyToken, getFeedPosts);
postRouter.get('/:userId', verifyToken, getUserPosts);
postRouter.patch('/:id/:userId', verifyToken, likePost);
postRouter.post('/new', verifyToken, createPost);

module.exports = postRouter;