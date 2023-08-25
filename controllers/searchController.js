const userModel = require('../model/userModel');

const searchFriends = async (req, res) => {
    try 
    {
        const { name } = req.body;
        const regex = new RegExp(`${name}`);

        let results = await userModel.find( {"name" : {$regex: regex, $options: 'i'}} );
        
        results = results.map( (user) => {
            user.password = "";
            return user;
        });

        res.status(201).json(results);
    }

    catch (error)
    {
        res.status(500).json( {message: error.message} );
    }
};

const getRecommendFriends = async (req, res) => {
    try 
    {
        const { friends, userId } = req.body;
        const recommendFriends = await userModel.find({
            $and: [ 
                { _id: {$nin: [...friends, userId]} }, 
                { name: { $ne: 'Demo' } } 
            ]
        }).limit(4); 
        
        res.status(201).json(recommendFriends);
    }

    catch (error)
    {
        res.status(500).json( {message: error.message} );
    }
};

module.exports = {
    searchFriends,
    getRecommendFriends
};