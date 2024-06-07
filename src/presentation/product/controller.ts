import { Request, Response } from "express";
import { CreateProductDto } from "../../domain/dtos/porduct/create-product.dto";
import { ProductService } from "../../services/product.service";
import { Validators } from "../../config/validator";
import { UpdateProductDto } from "../../domain/dtos/porduct/update-product.dto";
import { HandleError } from "../../domain/errors/handle.error";


export class ProductController{
    constructor(private readonly productServices:ProductService, ){}
    
    create = (req:Request, res:Response) => {
        const [error, createProductDto] = CreateProductDto.create(req.body)
        if(error) return res.status(400).json({error})
        this.productServices.create(createProductDto!)
        .then(product => res.json(product))
        .catch(error => HandleError.error(error, res))
    };

    update = (req:Request, res:Response) => {
        const id = req.params.id
        if(!Validators.validationMongoId(id)) throw Error('mongo id is not valid')
        const [error, updateProductDto] = UpdateProductDto.update(req.body)
        if(error) return res.status(400).json({error})
        this.productServices.update(updateProductDto!, id!)
        .then(product => res.json(product))
        .catch(error => HandleError.error(error, res))
    }

    delete = (req:Request, res:Response) => {
        const id = req.params.id
        if(!Validators.validationMongoId(id)) throw Error('mongo id is not valid')
        this.productServices.delete(id!)
        .then(product => res.json(product))
        .catch(error => HandleError.error(error, res))
    }

    findOne = (req:Request, res:Response) => {
        const id = req.params.id
        if(!Validators.validationMongoId(id)) throw Error('mongo id is not valid')
        this.productServices.findOne(id!)
        .then(product => res.json(product))
        .catch(error => HandleError.error(error, res))  
    }

    findAll = (req:Request, res:Response) => {
        return res.json({message:"product findAll"})
    }

}
