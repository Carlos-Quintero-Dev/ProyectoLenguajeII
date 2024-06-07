import { Router } from "express";
import { UploadController } from "./controller";
import { UploadFileMiddleware } from "../middlewares/upload-File.Middleware";
import { UploadFileService } from "../../services/upload-file.service";


export class uploadRoute{
    static get route(): Router{
         const routes = Router();
         const service = new UploadFileService();
         const controller = new UploadController(service);
         
         routes.post('/single/:type', [
            UploadFileMiddleware.containFile,
        ],controller.uploadSingleFile );

         routes.post('/multiple', controller.uploadMultipleFile);
         return routes;
     }
}