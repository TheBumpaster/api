import {join} from "path";
import {Logger} from "../services/logger";
import {writeFileSync} from "fs";

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
        this.migrationServiceInstance = db_migrate.getInstance(true, { config: "./database.json", env: process.env.ENV, cwd: join(__dirname, "../services")}, () => {
            this.logger.warn("Migrations instance configured.")
        });
        this.migrationServiceInstance.up(50).then(() => {
            this.logger.info(`Successfully executed all migrations.`);
        })
    }

    cleanUpDatabase(callback) {
        this.migrationServiceInstance.dropDatabase(this.config.test.database, () => {
            this.logger.info(`Successfully dropped testing database '${this.config.test.database}'`);
            callback(true);
        });
        // this.migrationServiceInstance.reset().then(() => {
        //     this.logger.info(`Successfully resetted all migrations.`);
        //     callback(true);
        // });
    }

    generateMigrationsConfig() {
        this.config = {
            dev: {
                driver: "mongodb",
                database: process.env.MONGO_DB,
                host: process.env.MONGO_HOST,
                port: process.env.MONGO_PORT,
            },
            test: {
                driver: "mongodb",
                database: process.env.MONGO_DB,
                host: process.env.MONGO_HOST,
                port: process.env.MONGO_PORT,
            },
            production: {
                driver: "mongodb",
                database: process.env.MONGO_DB,
                host: process.env.MONGO_HOST,
                port: process.env.MONGO_PORT,
            },

        };
        writeFileSync("./database.json", JSON.stringify(this.config), {flag: "w+"});

    }

}
