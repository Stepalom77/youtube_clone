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

module.exports = {
    getAll: getUsers
}