const postModel = require('../model/postModel');
const userModel = require('../model/userModel');
const uploadImage = require('../uploads/uploadImage');

const createPost = async (req, res) => {
    try
    {
        const {
            userId,
            imageName,
            description,
            imageBase64
        } = req.body;

        const user = await userModel.findOne( {_id: userId} ); 

        const response = await uploadImage(imageBase64, 'Posts');
        const imageUrl = response.secure_url;

        const newPost = await postModel.create({
            userId,
            name: user.name,
            location: user.location,
            occupation: user.occupation,
            description,
            imageName,
            userImageName: user.imageName,
            postImageUrl: imageUrl,
            userImageUrl: user.imageUrl
        });

        res.status(201).json(newPost);
    }

    catch (error)
    {
        res.status(400).json( {message: error.message} );
    }
};

const getFeedPosts = async (req, res) => {
    try 
    {
        const allPosts = await postModel.find( {} ).sort({ createdAt: -1 }).limit(50);   
        res.status(200).json(allPosts);
    }

    catch (error)
    {
        res.status(400).json( {message: error.message} );
    }
};

const getUserPosts = async (req, res) => {
    try 
    {
        const { userId } = req.params;
        const userPosts = await postModel.find( {userId} ).sort({ createdAt: -1 });

        res.status(200).json(userPosts);
    }

    catch (error)
    {
        res.status(400).json( {message: error.message} );
    }
};

const likePost = async (req, res) => {
    try 
    {
        const { id, userId } = req.params;
        const post = await postModel.findOne( {_id: id} );

        if (post.likes.get(userId))
        {
            post.likes.delete(userId);
        }

        else 
        {
            post.likes.set(userId, true);
        }

        await post.save();
        res.status(200).json(post);
    }

    catch (error)
    {
        res.status(400).json( {message: error.message} );
    }
};

module.exports = {
    createPost,
    getFeedPosts,
    getUserPosts,
    likePost
};