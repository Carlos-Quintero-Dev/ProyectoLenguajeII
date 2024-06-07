import express from "express";
import { AppRoute } from "./routes";
import { envs } from "../config/envs";
import fileupload from "express-fileupload";

export class Server{
    private app = express();

    start(){
        // middlewares
        this.app.use( express.json() )
        this.app.use( express.urlencoded({ extended: true }) )
        this.app.use( fileupload({
            limits: {
                files: 50*50*1024, // 50MG max
            }
        }) );

        this.app.use(AppRoute.route)

        //listener
        this.app.listen(envs.PORT, () => {
            console.log(`server running on port ${envs.PORT}`);
        })
    }
}