import { JwtAdapter } from "../config/jwt.adapter";
import { UserModel } from "../data/mongoDb/models/user.model";
import { LoginUserDto } from "../domain/dtos/auth/login-user.dto";
import { RegisterUserDto } from "../domain/dtos/auth/register-user.dto";
import { UserEntity } from "../domain/entities/user.entity";
import { ROLES } from "../domain/enums/role.enum";
import { CustomError } from "../domain/errors/custom.error";
import { UserMaper } from "../domain/mapers/userMapers";

export class AuthService {
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { email } = registerUserDto;
    try {
      const exist = await UserModel.findOne({ email });
      if (exist) throw Error("invalid user");
      const user = await UserModel.create({
        ...registerUserDto,
        roles: [ROLES.USER],
      });
      if (!user) throw CustomError.badRequest("register user failed")
      await user.save();
      return UserMaper.fromEntity(user);
    } catch (error) {
      if( error instanceof CustomError ) throw error;
      throw CustomError.internalServer();
    }
  }

  async login(
    loginUserDto: LoginUserDto
  ): Promise<{ token: string; user: UserEntity }> {
    const { email, password } = loginUserDto;

    try {
      const loginUser = await UserModel.findOne({ email });
      if (!loginUser) throw Error("no existe el usuario");
      if (loginUser.password !== password) throw Error("invalid password");
      const token = await JwtAdapter.generateToken({ id: loginUser.id });
      if (!token) throw CustomError.badRequest("token failed")

      return {
        token,
        user: UserMaper.fromEntity(loginUser),
      };
    } catch (error) {
      if( error instanceof CustomError ) throw error;
      throw CustomError.internalServer();
    }
  }
}
