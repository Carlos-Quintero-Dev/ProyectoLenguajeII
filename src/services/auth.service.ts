import { UserModel } from "../data/mongoDb/models/user.model";
import { LoginUserDto } from "../domain/dtos/auth/login-user.dto";
import { RegisterUserDto } from "../domain/dtos/auth/register-user.dto";
import { UserEntity } from "../domain/entities/user.entity";
import { UserMaper } from "../domain/mapers/userMapers";



export class AuthService{
    async register(registerUserDto:RegisterUserDto):Promise<UserEntity>{
        const { email } = registerUserDto
        try {
            const exist = await UserModel.findOne({ email });
            if(exist) throw Error('invalid user');
            const user = await UserModel.create(registerUserDto);
            if(!user) throw Error('Error')
            await user.save();
            return UserMaper.fromEntity(user);
        } catch (error) {
           throw error;
        }
    }

    async login (loginUserDto:LoginUserDto):Promise<UserEntity> {
        const {email, password} = loginUserDto

        try {
            
            const loginUser = await UserModel.findOne({email})
            if(!loginUser) throw Error('no existe el usuario')
            if(loginUser.password !== password) throw Error('invalid password')

        return UserMaper.fromEntity(loginUser)
        } catch (error) {
            throw Error('error')
        }
    }
    
}