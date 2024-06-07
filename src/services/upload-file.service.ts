import path from "path";
import { UploadFileDto } from "../domain/dtos/upload-file/upload-file.dto";
import { existsSync, mkdirSync } from "fs";
import { UuidAdapter } from "../config/uuid.adapter";

export class UploadFileService{
    chechFolder(folderPath:string){
        if( !existsSync(folderPath) ){
            mkdirSync(folderPath, { recursive:true });
        }
    }

    async uploadSingle( uploadFileDto:UploadFileDto ){
        const { type, files } = uploadFileDto;
        const extensionFile = files.name.split(".").at(-1);
        const filename = `${UuidAdapter.generateUUID()}.${extensionFile}`;
        const folderPath = path.resolve(__dirname, `../../uploads/${type}`);
        this.chechFolder(folderPath);

        await files.mv(`${folderPath}/${filename}`);
        return {
            type,
            filename,
        }
    }

}