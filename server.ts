import 'dotenv/config'
import Express, {Request, Response} from "express";
import morgan from "morgan";
import cors from "cors";
import {UsersRoutes} from './server/routes/usersRoutes'
import {VideosRoutes} from './server/routes/videosRoutes'
import mongoose from "mongoose";

class App {

    public app = Express();
    public routeUser: UsersRoutes = new UsersRoutes(); 
    public routeVideo: VideosRoutes = new VideosRoutes(); 
    public mongoUrl: any = process.env.MONGO_URI;
    public PORT = process.env.PORT || 7000;

    constructor() {
        this.config();
        this.mongoSetup();
        this.get();
        this.listen();
        this.routeUser.routes(this.app);
        this.routeVideo.routes(this.app);     
    }

    private config(): void{
        this.app.use(Express.json());
        this.app.use(Express.urlencoded({extended: true}));
        this.app.use(Express.static('public'));
        this.app.use(morgan('dev'))
        this.app.use(cors())
    }

    public routes(app: any): void {
      app.route('/api/v1', this.routeUser);
      app.route('/api/v1', this.routeVideo);
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);        
    }

    private get(): void {
      this.app.get('/', (req:Request, res:Response) => {
        res.send('Server up & running ✅');
      })
    }

    private listen(): void {
      this.app.listen(this.PORT, () => console.log(`Listening on port:${this.PORT}`))
    }

}

export default new App().app;
