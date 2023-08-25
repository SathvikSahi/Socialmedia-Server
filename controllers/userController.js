const userModel = require('../model/userModel');

const getUser = async (req, res) => {
    try 
    {
        const { id } = req.params;
        const user = await userModel.findOne( {_id: id} );

        if (!user)
        {
            res.status(404).json( {message: 'user not found'} );
            return;
        }

        user.password = "";
        res.status(200).json(user);
    }

    catch (error)
    {
        res.status(500).json( {message: error.message} );
    }
};

const getUserFriends = async (req, res) => {
    try 
    {
        const { id } = req.params;
        const user = await userModel.findOne( {_id: id} );

        if (!user)
        {
            res.status(404).json( {message: 'user not found'} );
            return;
        }

        let friends = await Promise.all(
            user.friends.map( (friendId) => {
                return userModel.findOne( {_id: friendId} );
            })
        );

        friends = friends.map( (friend) => {
            friend.password = "";
            return friend
        });

        res.status(200).json(friends);
    }

    catch (error)
    {
        res.status(500).json( {message: error.message} );
    }
};

const addRemoveFriend = async (req, res) => {
    try 
    {
        const { id, friendId } = req.params;

        const user = await userModel.findOne( {_id: id} );
        const friend = await userModel.findOne( {_id: friendId} );

        if (!user || !friend)
        {
            res.status(404).json( {message: 'user not found'} );
            return;
        }

        if (user.friends.includes(friendId))
        {
            user.friends = user.friends.filter( (fid) => {
                return fid !== friendId;
            });

            friend.friends = friend.friends.filter( (fid) => {
                return fid !== id;
            });
        }

        else 
        {
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        await user.save();
        await friend.save();

        res.status(200).json(user.friends);
    }

    catch (error)
    {
        res.status(500).json( {message: error.message} );
    }
};

module.exports = {
    getUser,
    getUserFriends,
    addRemoveFriend
};