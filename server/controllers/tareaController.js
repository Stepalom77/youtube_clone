const tarea = require('../models/tareaModel');

const getTarea = async (req, res) => {
    let tareas = [];
try {
    tareas = await tarea.find();
    
} catch (err) {
    console.log(err);
    return res.status(400).json({message: 'There was an error'});
}
    return res.status(200).json(tareas);
}

module.exports = {
    getAll: getTarea
}