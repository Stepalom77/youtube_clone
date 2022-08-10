const users = require('../models/usersModel');

const getUsers = async (req, res) => {
   let allusers = [];
try {
     allusers = await users.find();
    
} catch (err) {
    console.log(err);
    return res.status(400).json({message: 'There was an error'});
}
    return res.status(200).json(allusers);
}

const getUser = async (req, res) => {
    //let userId = req.params._id;
    let userSearched = null;
    try {
        userSearched = await users.findById(req.params.id);
    } catch (err) {
        console.error(err);
        if (!userSearched) {
            return res.status(404).json({message: 'Error, the user your searched does not exists'})
        } else {
            return res.status(400).json({message: 'There was an error'})
        };
    };
    return res.status(200).json(userSearched);
};

const createUser = async (req, res) => {
    let userCreated = null;
    try{
        userCreated = await users.create(req.body)
    } catch (err) {
        console.error(err);
        return res.status(400).json({message: 'There was an error'})
    };
    return res.status(200).json(userCreated);
};

const updateUser = async (req, res) => {
    let userUpdated = null;
    let {
        first_name, last_name, email, username, password, telephone_number, description, payment_method,
        rating, subscriptions, subscriptors, members, liked_videos 
    } = req.body
    try {
        userUpdated =  await users.findById(req.params.id);
        userUpdated =  await users.updateMany({
            first_name: first_name,
            last_name: last_name,
            email: email,
            username: username,
            password: password,
            telephone_number: telephone_number,
            description: description,
            payment_method: payment_method,
            rating: rating,
            subscriptions: subscriptions,
            subscriptors: subscriptors,
            members: members,
            liked_videos: liked_videos
        })
    } catch (err) {
        console.error(err);
        if (!userUpdated) {
            return res.status(404).json({message: 'The user you are trying to updated does not exist'})
        } else {
            return res.status(400).json({message: 'There was an error'})
        };
    };
    return res.status(200).json(userUpdated);
};

const deleteUser = async (req, res) => {
    let userId = req.params.id;
    let userDeleted = null;
    try {
        userDeleted = await users.deleteOne({
            $where: {
                id: userId
            }
        })
    } catch (err) {
        console.error(err);
        if(!userDeleted) {
            return res.status(404).json({message: 'The user you are trying to delete does not exist'})
        } else {
            return res.status(400).json({message: 'There was an error'})
        }
    };
    return res.status(204).json({message: 'The user was deleted'});
}

module.exports = {
    getAll: getUsers,
    getOne: getUser,
    create: createUser,
    update: updateUser,
    delete: deleteUser
}