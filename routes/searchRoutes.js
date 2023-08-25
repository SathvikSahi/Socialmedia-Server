const express = require('express');
const searchRouter = express.Router();

const verifyToken = require('../middleware/authorize');

const {
    searchFriends,
    getRecommendFriends
} = require('../controllers/searchController');

searchRouter.post('/', verifyToken, searchFriends);
searchRouter.post('/recommend', verifyToken, getRecommendFriends);

module.exports = searchRouter;