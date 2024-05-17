export class UserEntity{
    constructor(
        id: string,
        name: string,
        email:string,
        password:string,
        roles:string[],
        img?: string
    ){};
}