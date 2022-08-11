import { Express } from "express";
import { VideosController } from "../controllers/videosController";

export class VideosRoutes {
    public videosController: VideosController = new VideosController();
    public routes(app: Express): void {
        app.route('/videos')
        .get(this.videosController.getVideos)
        .post(this.videosController.createVideo)

        app.route('/videos/:id')
        .get(this.videosController.getVideo)
        .put(this.videosController.updateVideo)
        .delete(this.videosController.deleteVideo)
    } 
}