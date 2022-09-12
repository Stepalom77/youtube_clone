import { Express } from "express";
import { PostsController } from "../controllers/postsController";
import { requiresAuth } from "express-openid-connect";
export class PostsRoutes {
    public postsController: PostsController = new PostsController();
    public routes(app: Express): void {
        app.route('/api/posts')
        .get(this.postsController.getPosts)
        .post(/*requiresAuth(),*/ this.postsController.createPost)

        app.route('/api/posts/:id')
        .get(this.postsController.getPost)
        .put(/*requiresAuth(),*/ this.postsController.updatePost)
        .delete(/*requiresAuth(),*/ this.postsController.deletePost)

        app.route('/api/posts-with-comments')
        .get(this.postsController.getPostsWithComments)

        app.route('/api/posts-with-comments/:id')
        .get(this.postsController.getPostWithComments)
    } 
}