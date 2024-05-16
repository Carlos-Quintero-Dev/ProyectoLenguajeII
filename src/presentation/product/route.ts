import { Router } from "express";
import { ProductController } from "./controller";

export class ProductRoute{
   static get route(): Router{
        const routes = Router();
        const controller = new ProductController() 
        routes.get('/', controller.findAll);
        routes.put('/', controller.update);
        routes.delete('/', controller.delete);
        routes.post('/', controller.create)
        return routes;
    }
}