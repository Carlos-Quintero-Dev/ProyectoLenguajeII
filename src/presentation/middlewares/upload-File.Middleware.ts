import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";

export class UploadFileMiddleware{
    static containFile(req:Request, res:Response, next:NextFunction){

        const files = req.files;

        if( !files || Object.keys(files).length===0 ) return res.status(400).json({error:"Missing file"});
        
        if( Array.isArray(files) ){
            req.body.files = files.file;
        }else{
            req.body.files = [files.file];
        }

        next();
    }

}