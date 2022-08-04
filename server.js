require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
const connectDB = require('./server/config/db')

connectDB();
const app = express();
const PORT = process.env.PORT || 7000;

//Import routes
const tareasRoute = require('./server/routes/tareaRoutes');

//Middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//Routes
app.use('/api/v1', tareasRoute);


app.get('/', (req, res) => {
    res.send('Server up & running ✅');
  })

app.listen(PORT, () => console.log(`Listening on port:${PORT}`))