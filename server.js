require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
const connectDB = require('./server/config/db')
//const mongoose = require('mongoose');

connectDB();
/*async function main() {
    await mongoose.connect(process.env.MONGO_URI)
}*/
const app = express();
const PORT = process.env.PORT || 7000;

//Import routes
const tareasRoute = require('./server/routes/tareaRoutes');

/*const createMessage = () => {
    const messageSchema = new mongoose.Schema({
        content: String,
        sender: String,
        read: Boolean
    });
   
    messageSchema.methods.send = function send() {
        console.log(`El mensaje "${this.content}" fue enviado`)
    };

    const Message = mongoose.model('Message', messageSchema);
    const message = new Message({
    content: 'Este es el primer mensaje',
    sender: 'Stephano Palomino',
    read: false
});


return message.save();
};*/



//Middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//Routes
app.use('/api/v1', tareasRoute);

/*main()
.then(() => {
    console.log('La conexion fue exitosa');
    createMessage()
    .then((message) => {
        message.send()
    })
    .catch((err) => {
        console.log(err)
    })
})
.catch((err) => {
    console.log(err)
});*/

app.get('/', (req, res) => {
    res.send('Server up & running ✅');
  })

app.listen(PORT, () => console.log(`Listening on port:${PORT}`))