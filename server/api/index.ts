import {Application} from "express";
import {UserRouter} from "./routes/user";
import {DefaultRouter} from "./routes/default";
import {Request} from "express";
import {authorize} from "./middlewares/authorization";
import {LinksRouter} from "./routes/links";
import {IUserModelDocument} from "../models/user/schema";

export class API {

    constructor(application: Application) {

        // Prefix module routers
        application.use("/users", authorize, new UserRouter().getRouter());
        application.use("/links", authorize, new LinksRouter().getRouter());

        // Define default routes here
        application.use("/", new DefaultRouter().getRouter());
    }
}

export interface AuthorizedRequest extends Request {
    payload?: string | object | { user: IUserModelDocument };
}
