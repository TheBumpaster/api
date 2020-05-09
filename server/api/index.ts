import {Application} from "express";
import {UserRouter} from "./routes/user";
import {DefaultRouter} from "./routes/default";

export class API {

    constructor(application: Application) {

        // Prefix module routers
        application.use("/users", new UserRouter().getRouter());

        // Define default routes here
        application.use("/", new DefaultRouter().getRouter());
    }
}
