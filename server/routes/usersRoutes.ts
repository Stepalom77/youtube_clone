import { Express } from "express";
import { UsersController } from "../controllers/usersController";
import { checkJwt } from "../middlewares/authMiddleware";
import { checkPermissions } from "../middlewares/permissionsMiddleware";
import { UserPermissions, AdminPermissions } from "../utils/users-permissions";
export class UsersRoutes {
    public userController: UsersController = new UsersController();
    public routes(app: Express): void {
        app.route('/api/users')
        .get(checkJwt, this.userController.getUsers)
        .post(this.userController.createUser)

        app.route('/api/users/:id')
        .get(this.userController.getUser)
        .put(checkJwt, this.userController.updateUser)
        .delete(checkJwt, this.userController.deleteUser)

        app.route('/api/users-with-comments')
        .get(this.userController.getUsersWithComments)

        app.route('/api/users-with-videos')
        .get(this.userController.getUsersWithVideos)

        app.route('/api/users-with-posts')
        .get(this.userController.getUsersWithPosts)

        app.route('/api/users-with-comments/:id')
        .get(this.userController.getUserWithComments)

        app.route('/api/users-with-videos/:id')
        .get(this.userController.getUserWithVideos)

        app.route('/api/users-with-posts/:id')
        .get(this.userController.getUserWithPosts)
    } 
}