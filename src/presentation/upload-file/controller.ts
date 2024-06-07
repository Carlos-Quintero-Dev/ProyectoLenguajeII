import { Response, Request } from "express";
import { UploadFileDto } from "../../domain/dtos/upload-file/upload-file.dto";
import { UploadFileService } from "../../services/upload-file.service";
import { HandleError } from "../../domain/errors/handle.error";

export class UploadController{
    constructor(private readonly uploadFileService:UploadFileService){}
    
    uploadSingleFile = (req:Request, res:Response) => {
        const [error, uploadFileDto] = UploadFileDto.upload( { type: req.params.type, files: req.body.files.at(0) } );
        if( error ) return res.status(400).json({error})
        this.uploadFileService.uploadSingle(uploadFileDto!)
        .then(data=>res.json(data))
        .catch(error => HandleError.error(error, res) )
    };

    uploadMultipleFile = (req:Request, res:Response) => {
        return res.json({message: "uploadMultipleFile"})
    };
} 