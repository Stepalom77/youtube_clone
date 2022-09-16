import { Express } from "express";
import { PostsController } from "../controllers/postsController";
import { checkJwt } from "../middlewares/authMiddleware";
export class PostsRoutes {
    public postsController: PostsController = new PostsController();
    public routes(app: Express): void {
        app.route('/api/posts')
        .get(this.postsController.getPosts)
        .post(this.postsController.createPost)

        app.route('/api/posts/:id')
        .get(this.postsController.getPost)
        .put(checkJwt, this.postsController.updatePost)
        .delete(checkJwt, this.postsController.deletePost)

        app.route('/api/posts-with-comments')
        .get(this.postsController.getPostsWithComments)

        app.route('/api/posts-with-comments/:id')
        .get(this.postsController.getPostWithComments)
    } 
}