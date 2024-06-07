import { Router } from "express";
import { AuthService } from "../../services/auth.service";
import { AuthController} from "./controller";

export class AuthRoute{
    static get route(): Router{
         const routes = Router();
         const authServices = new AuthService();
         const controller = new AuthController(authServices);
         routes.post('/register', controller.register );
         routes.post('/login', controller.login);
         return routes;
     }
}