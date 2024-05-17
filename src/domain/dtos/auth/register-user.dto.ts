export class RegisterUserDto{
    constructor(
        public name:string,
        public email:string,
        public password:string
    ){};

    static register(object:{[key:string]:any}):[string?, RegisterUserDto?]{
        const {name, email, password} = object
        if(!name) return['name is required', undefined]
        if(!email) return['email is required', undefined]
        if(!password) return['password is required', undefined]

        return [undefined, new RegisterUserDto(name, email, password)]
    }
}