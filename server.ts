import * as dotenv from "dotenv";
import Express, {Request, Response} from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from 'body-parser';
import {UsersRoutes} from './server/routes/usersRoutes'
import {VideosRoutes} from './server/routes/videosRoutes'
import {PostsRoutes} from './server/routes/postsRoutes'
import {CommentsRoutes} from './server/routes/commentsRoutes'
import mongoose from "mongoose";
import {auth} from 'express-openid-connect'

dotenv.config();
class App {

    public app = Express();
    public routeUser: UsersRoutes = new UsersRoutes(); 
    public routeVideo: VideosRoutes = new VideosRoutes();
    public routePost: PostsRoutes = new PostsRoutes();
    public routeComment: CommentsRoutes = new CommentsRoutes();  
    public mongoUrl: any = process.env.MONGO_URI;
    public PORT = process.env.PORT || 7000;

    constructor() {
        this.config();
        this.mongoSetup();
        this.get();
        this.listen();
        this.routeUser.routes(this.app);
        this.routeVideo.routes(this.app);
        this.routePost.routes(this.app);
        this.routeComment.routes(this.app);     
    }

    private config(): void{
        this.app.use(Express.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(Express.static('public'));
        this.app.use(morgan('dev'))
        this.app.use(cors())
        this.app.use(auth({
          issuerBaseURL: process.env.ISSUER_BASE_URL,
          baseURL: process.env.BASE_URL,
          clientID: process.env.CLIENT_ID,
          secret: process.env.SECRET,
          idpLogout: true,
          authRequired: false,
          auth0Logout: true,
        }))
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
