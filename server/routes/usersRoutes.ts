import { Express } from "express";
import { UsersController } from "../controllers/usersController";
import { requiresAuth } from "express-openid-connect";
//import { checkJwt } from "../middlewares/authMiddleware";
//import { checkPermissions } from "../middlewares/permissionsMiddleware";
//import { UserPermission } from "../utils/users-permissions";
export class UsersRoutes {
    public userController: UsersController = new UsersController();
    public routes(app: Express): void {
        app.route('/api/users')
        .get(/*requiresAuth(),*/ this.userController.getUsers)
        .post(this.userController.createUser)

        app.route('/api/users/:id')
        .get(/*requiresAuth(),*/ this.userController.getUser)
        .put(/*requiresAuth(),*/ this.userController.updateUser)
        .delete(/*requiresAuth(),*/ this.userController.deleteUser)

        app.route('/api/users-with-comments')
        .get(/*requiresAuth(),*/ this.userController.getUsersWithComments)

        app.route('/api/users-with-videos')
        .get(/*requiresAuth(),*/ this.userController.getUsersWithVideos)

        app.route('/api/users-with-posts')
        .get(/*requiresAuth(),*/ this.userController.getUsersWithPosts)

        app.route('/api/users-with-comments/:id')
        .get(this.userController.getUserWithComments)

        app.route('/api/users-with-videos/:id')
        .get(this.userController.getUserWithVideos)

        app.route('/api/users-with-posts/:id')
        .get(this.userController.getUserWithPosts)
    } 
}