import { Router } from "express";
import { ProductRoute } from "./product/route";
import { CategoryRoute } from "./category/route";
import { AuthRoute } from "./auth/route";
import { uploadRoute } from "./upload-file/route";

export class AppRoute{
   static get route(): Router{
        const routes = Router();
        routes.use('/api/product', ProductRoute.route)
        routes.use('/api/category', CategoryRoute.route)
        routes.use('/api/auth', AuthRoute.route)
        routes.use('/api/upload', uploadRoute.route )
        return routes;
    }
}