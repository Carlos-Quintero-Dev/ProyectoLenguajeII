export class LoginUserDto{
    constructor(
        public email:string,
        public password:string
    ){};

    static login(object:{[key:string]:any}):[string?, LoginUserDto?]{
        const {email,password} = object
        if(!email) return['email is required', undefined]
        if(!password) return['password is required', undefined]

        return [undefined, new LoginUserDto(email,password)]
    }
}