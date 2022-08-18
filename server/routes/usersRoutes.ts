import { Express } from "express";
import { UsersController } from "../controllers/usersController";
//import {requiresAuth} from 'express-openid-connect'
import { checkJwt } from "../middlewares/authMiddleware";
export class UsersRoutes {
    public userController: UsersController = new UsersController();
    public routes(app: Express): void {
        app.route('/api/users')
        .get(checkJwt, this.userController.getUsers)
        .post(this.userController.createUser)

        app.route('/api/users/:id')
        .get(checkJwt, this.userController.getUser)
        .put(checkJwt, this.userController.updateUser)
        .delete(checkJwt, this.userController.deleteUser)
    } 
}