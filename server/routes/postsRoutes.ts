import { Express } from "express";
import { PostsController } from "../controllers/postsController";

export class PostsRoutes {
    public postsController: PostsController = new PostsController();
    public routes(app: Express): void {
        app.route('/api/posts')
        .get(this.postsController.getPosts)
        .post(this.postsController.createPost)

        app.route('/api/posts/:id')
        .get(this.postsController.getPost)
        .put(this.postsController.updatePost)
        .delete(this.postsController.deletePost)
    } 
}