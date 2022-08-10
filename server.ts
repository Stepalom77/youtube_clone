require('dotenv').config()
import express, {Request, Response} from "express";
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require('./server/config/db')

connectDB();
const app = express();
const PORT = process.env.PORT || 7000;

//Import routes
const usersRoute = require('./server/routes/usersRoutes');

//Middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//Routes
app.use('/api/v1', usersRoute);


app.get('/', (req:Request, res:Response) => {
    res.send('Server up & running ✅');
  })

app.listen(PORT, () => console.log(`Listening on port:${PORT}`))