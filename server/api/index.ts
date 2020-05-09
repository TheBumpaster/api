import {Application} from "express";
import {UserRouter} from "./routes/user";
import {DefaultRouter} from "./routes/default";
import {Request} from "express";
import {authorize} from "./middlewares/authorization";

export class API {

    constructor(application: Application) {

        // Prefix module routers
        application.use("/users", authorize, new UserRouter().getRouter());

        // Define default routes here
        application.use("/", new DefaultRouter().getRouter());
    }
}

export interface AuthorizedRequest extends Request {
    user?: string | object;
}
