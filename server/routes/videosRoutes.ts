import { Express } from "express";
import { VideosController } from "../controllers/videosController";
import { checkJwt } from "../middlewares/authMiddleware";
export class VideosRoutes {
    public videosController: VideosController = new VideosController();
    public routes(app: Express): void {
        app.route('/api/videos')
        .get(this.videosController.getVideos)
        .post(this.videosController.createVideo)

        app.route('/api/videos/:id')
        .get(this.videosController.getVideo)
        .put(checkJwt, this.videosController.updateVideo)
        .delete(checkJwt, this.videosController.deleteVideo)

        app.route('/api/videos-with-comments')
        .get(this.videosController.getVideosWithComments)

        app.route('/api/videos-with-comments/:id')
        .get(this.videosController.getVideoWithComments)
    } 
}