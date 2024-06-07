import mongoose from "mongoose";
import { ROLES } from "../../../domain/enums/role.enum";

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'name Is Required']
    },
    email: {
        type:String,
    },
    password:{
        type:String,
    },
    roles:{
        enum: Object.values(ROLES),
        type:[String],
    },
    img:{
        type:String,
    }
})

export const UserModel = mongoose.model('user',userSchema)