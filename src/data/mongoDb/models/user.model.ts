import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
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
        type:[String],
    },
    img:{
        type:String,
    }
})

export const UserModel = mongoose.model('category',categorySchema)