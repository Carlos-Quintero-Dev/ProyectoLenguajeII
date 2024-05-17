import { Router } from "express";
import { ProductRoute } from "./product/route";
import { CategoryRoute } from "./category/route";
import { UserRoute } from "./auth/route";

export class AppRoute{
   static get route(): Router{
        const routes = Router();
        routes.use('/api/product', ProductRoute.route)
        routes.use('api/category', CategoryRoute.route)
        routes.use('api/auth', UserRoute.route)
        return routes;
    }
}