import * as jwt from "jsonwebtoken";


export class JwtAdapter{

    static async generateToken( payload: Object, duration:string = '2h' ):Promise<string|null>{
        return new Promise( ( resolve ) => {
            jwt.sign( payload, "HolaMundo", { expiresIn: duration }, ( error, token ) => {
                if( error ) return resolve( null );
                
                return resolve( token! );
            });
        });
    }

    static validateToken<T>( token: string ): Promise<T|null>{
        return new Promise((resolve)=>{
            jwt.verify( token, "HolaMundo", (error, decoded) => {
                if( error ) return resolve( null );
                
                return resolve( decoded as T );
            });
        });
    }
}