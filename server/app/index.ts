import * as express from "express";
import {Logger} from "../services/logger";
import {API} from "../api";

export class Application {
    public server: express.Application;
    public API: API;
    private logger: Logger = new Logger(__filename);

    constructor(port: string | number, hostname: string) {

        // Attach express application
        this.server = express();
        this.API = new API(this.server);

        // Initialize listener
        this.server.listen(Number(port), hostname,() => {
            // Pass event to logger
            this.logger.info(`Server listener started successfully on ${hostname}:${port} `);
        })
    }
}
