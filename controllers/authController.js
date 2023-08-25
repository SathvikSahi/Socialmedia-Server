const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uploadImage = require('../uploads/uploadImage');

const register = async (req, res) => {
    try 
    {
        const {
            name,
            email,
            password,
            location,
            occupation,
            imageName,
            imageBase64
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt);

        const response = await uploadImage(imageBase64, 'Users');
        const imageUrl = response.secure_url;

        const user = await userModel.create({
            name,
            email,
            password: passwordHash,
            location,
            occupation,
            imageName,
            imageUrl,
            friends: [] 
        });

        user.password = "";

        res.status(201).json(user);
    }

    catch (error)
    {
        res.status(500).json( {message: error.message} );
    }
};

const login = async (req, res) => {
    try 
    {
        const { email, password } = req.body;
        const user = await userModel.findOne( {email} );

        if (!user)
        {
            res.status(400).json( {message: 'Email not registered'} );
            return;
        }

        const isMatched = await bcrypt.compare(password, user.password);

        if (!isMatched)
        {
            res.status(400).json( {message: 'Wrong password'} );
            return;
        }

        const token = jwt.sign( {id: user._id}, process.env.JWT_SECRET );
        user.password = "";

        res.status(201).json( {token, user} );
    }

    catch (error)
    {
        res.status(500).json( {message: error.message} );
    }
};

module.exports = { register, login };