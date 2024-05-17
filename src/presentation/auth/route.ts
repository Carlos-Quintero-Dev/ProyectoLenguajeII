import { Router } from "express";
import { AuthService } from "../../services/auth.service";
import { UserController } from "./controller";

export class UserRoute{
    static get route(): Router{
         const routes = Router();
         const authServices = new AuthService();
         const controller = new UserController(authServices)
         routes.post('/', controller.register )
         routes.post('/', controller.login)
         return routes;
     }
 }