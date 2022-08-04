const users = require('../models/usersModel');

const getUsers = async (req, res) => {
    let users = [];
try {
    users = await users.find();
    
} catch (err) {
    console.log(err);
    return res.status(400).json({message: 'There was an error'});
}
    return res.status(200).json(users);
}

const getUser = async (req, res) => {
    let userId = req.params.id;
    let userSearched = null;
    try {
        userId = await users.findOne({$where: {id: userId}})
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
}

module.exports = {
    getAll: getUsers,
    getOne: getUser,
    create: createUser
}