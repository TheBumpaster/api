const express = require("express");
const cookieParser = require("cookie-parser");
import {Logger} from "../services/logger";
import {API} from "../api";
import {json} from "body-parser";

export class Application {
    public server;
    public API: API;
    private logger: Logger = new Logger(__filename);

    constructor(port: string | number, hostname: string) {

        // Attach express application
        this.server = express();
        this.server.use(json());
        this.server.use(cookieParser());

        this.API = new API(this.server);

        // Initialize listener
        this.server.listen(Number(port), hostname,() => {
            // Pass event to logger
            this.logger.info(`Server listener started successfully on ${hostname}:${port} `);
        })
    }
}
