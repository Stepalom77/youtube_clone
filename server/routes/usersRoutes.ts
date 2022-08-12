import { Express } from "express";
import { UsersController } from "../controllers/usersController";

export class UsersRoutes {
    public userController: UsersController = new UsersController();
    public routes(app: Express): void {
        app.route('/api/users')
        .get(this.userController.getUser)
        .post(this.userController.createUser)

        app.route('/api/users/:id')
        .get(this.userController.getUsers)
        .put(this.userController.updateUser)
        .delete(this.userController.deleteUser)
    } 
}