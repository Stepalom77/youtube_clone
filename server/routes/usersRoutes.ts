import { Express } from "express";
import { UsersController } from "../controllers/usersController";
import {auth, requiresAuth} from 'express-openid-connect'
export class UsersRoutes {
    public userController: UsersController = new UsersController();
    public routes(app: Express): void {
        app.route('/api/users')
        .get(this.userController.getUsers, requiresAuth())
        .post(this.userController.createUser)

        app.route('/api/users/:id')
        .get(this.userController.getUser, requiresAuth())
        .put(this.userController.updateUser, requiresAuth())
        .delete(this.userController.deleteUser, requiresAuth())
    } 
}