import { Express } from "express";
import { CommentsController } from "../controllers/commentsController";
import { requiresAuth } from "express-openid-connect";

export class CommentsRoutes {
    public commentsController: CommentsController = new CommentsController();
    public routes(app: Express): void {
        app.route('/api/comments')
        .get(this.commentsController.getComments)
        .post(requiresAuth(), this.commentsController.createComment)

        app.route('/api/comments/:id')
        .get(this.commentsController.getComment)
        .put(requiresAuth(), this.commentsController.updateComment)
        .delete(requiresAuth(), this.commentsController.deleteComment)
    } 
}