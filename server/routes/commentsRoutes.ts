import { Express } from "express";
import { CommentsController } from "../controllers/commentsController";
import { checkJwt } from "../middlewares/authMiddleware";

export class CommentsRoutes {
    public commentsController: CommentsController = new CommentsController();
    public routes(app: Express): void {
        app.route('/api/comments')
        .get(this.commentsController.getComments)
        .post(this.commentsController.createComment)

        app.route('/api/comments/:id')
        .get(this.commentsController.getComment)
        .put(checkJwt, this.commentsController.updateComment)
        .delete(checkJwt, this.commentsController.deleteComment)
    } 
}