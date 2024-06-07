import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { HandleError } from "../../domain/errors/handle.error";
import { AuthService } from "../../services/auth.service";
import {Request, Response} from "express"


export class AuthController{
    constructor(private readonly authService:AuthService, ){}
    
    register = (req:Request, res:Response) => {
        const [error, registerUserDto] = RegisterUserDto.register(req.body)
        if(error) return res.status(400).json({error})
        this.authService.register(registerUserDto!)
        .then(user => res.json(user))
        .catch(error => HandleError.error(error, res))
    };

    login = (req:Request, res:Response) => {
        const [error, loginUserDto] = LoginUserDto.login(req.body)
        if(error) return res.status(400).json({error})
        this.authService.login(loginUserDto!)
        .then(user => res.json(user))
        .catch(error => HandleError.error(error, res))
    };
} 