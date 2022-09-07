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
        .get(this.userController.getUsers)
        .post(this.userController.createUser)

        app.route('/api/users/:id')
        .get(this.userController.getUser)
        .put(this.userController.updateUser)
        .delete(this.userController.deleteUser)
    } 
}