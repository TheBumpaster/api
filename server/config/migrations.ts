import {join} from "path";
import {Logger} from "../services/logger";
import {writeFile} from "fs";

const db_migrate = require("db-migrate");

export class Migrations {

    public migrationServiceInstance;
    private logger: Logger = new Logger(__filename);
    private config;

    constructor(
        params = {
            env: process.env.ENV as string,
            cwd: join(__dirname, "../services")
        }) {
        // Generate config
        this.config = params;
        this.generateMigrationsConfig();
    }


    initializeDatabaseStructure() {
        this.migrationServiceInstance = db_migrate.getInstance(true, { config: "./database.json", env: process.env.ENV, cwd: join(__dirname, "../services")}, (info) => {
            this.logger.warn("Migrations instance configured.")
        });
        this.migrationServiceInstance.up(50).then((info) => {
            console.log(info);
            this.logger.info(`Successfully executed all migrations`);
        })
    }

    generateMigrationsConfig() {
        this.config = {
            dev: {
                driver: "mongodb",
                database: process.env.MONGO_DB,
                host: process.env.MONGO_HOST,
                port: process.env.MONGO_PORT
            }
        };
        writeFile("./database.json", JSON.stringify(this.config), (error) => {
            if(error) {
                throw error;
            }
        });

    }

}
