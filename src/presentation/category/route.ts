import { Router } from "express";
import { CategoryController } from "./controller";
import { CategoryService } from "../../services/category.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class CategoryRoute{
   static get route(): Router{
        const routes = Router();
        const categoryServices = new CategoryService();
        const controller = new CategoryController(categoryServices)
        routes.get('/', controller.findAll);
        routes.put('/:id', controller.update);
        routes.delete('/id', controller.delete);
        routes.post('/', [AuthMiddleware.validateJwt], controller.create)
        return routes;
    }
}