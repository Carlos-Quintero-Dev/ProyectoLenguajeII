import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt.adapter";
import { UserModel } from "../../data/mongoDb/models/user.model";

export class AuthMiddleware{
    static async validateJwt(req:Request, res:Response, next:NextFunction){
        const authorization = req.header("Authorization");
        if(!authorization) return res.status(400).json({error:'Bearer invalid'})
        if(!authorization.startsWith('Bearer ')) return res.status(400).json({error:'Bearer invalid'})
        const token = authorization.split(' ').at(1) || "";
        if(!token) return res.status(400).json({error:'Bearer invalid'})
        
        const payload = await JwtAdapter.validateToken<{id:string}>(token);
        if(!payload || (payload === null)) return res.status(400).json({error:'payload invalid'})
        
        const user = await UserModel.findOne({_id: payload.id})
        if(!user) return res.status(400).json({error:'user not authorized'})

        req.body.user = user;
        next();
    }
}