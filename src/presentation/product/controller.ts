import { Request, Response } from "express";

export class ProductController{
    create = (req:Request, res:Response) => {
        return res.json({message:"product create"})
    }

    update = (req:Request, res:Response) => {
        return res.json({message:"product update"})
    }

    delete = (req:Request, res:Response) => {
        return res.json({message:"product delete"})
    }

    findAll = (req:Request, res:Response) => {
        return res.json({message:"product findAll"})
    }
}
