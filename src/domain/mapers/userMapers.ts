import { UserEntity } from "../entities/user.entity"


export class UserMaper{
    static fromEntity(Object:{[key:string]:any}):UserEntity{
        const {id, name, email, password, roles, img} = Object
        if(!name) throw Error('name is required')
        if(!email) throw Error('name is required')
        if(!password) throw Error('name is required')
        return new UserEntity(id,name, email, password, roles, img)
    }
}