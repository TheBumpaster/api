import {ConnectionOptions} from "mongoose";
const mongoose = require("mongoose");
import {Logger} from "../services/logger";
import {Migrations} from "./migrations";

export class Database {
    // Static function to generate mongo uri
    public static generateURI(host: string, port: string, db: string) {
        return `mongodb://${host}:${port}/${db}`;
    }


    public connected: boolean = false;
    public connecting: boolean = false;
    private logger: Logger = new Logger(__filename);
    private migrator: Migrations = new Migrations();

    constructor(mongoUri: string, options: ConnectionOptions = { useNewUrlParser: true, useUnifiedTopology: true}) {
        // Establish connection attempt
        this.connecting = true;
        mongoose.connect(mongoUri, options, (error) => {
            if (error) {
                this.connecting = false;
            }
            this.connected = true;

            // Run initial migrations
            this.migrator.initializeDatabaseStructure();
        });

        // Initialize database connection event listeners
        this.connectionStatusListener(mongoUri);
    }

    private connectionStatusListener(mongoUri: string) {
        // Listen to connection statuses
        mongoose.connection.on("connected", () => {
            this.logger.info(`Mongoose successfully connected on ${mongoUri}`);
            this.connecting = false;
            this.connected = true;
        });

        mongoose.connection.on("connecting", () => {
            this.logger.warn(`Mongoose is connecting to database on ${mongoUri}`);
            this.connecting = true;
            this.connected = false;
        });

        mongoose.connection.on("open", () => {
            this.logger.info(`Mongoose connection with database is ready and open!`);
        });

        mongoose.connection.on("disconnecting", () => {
            this.logger.warn(`Mongoose is closing the connection.`);
        });

        mongoose.connection.on("disconnected", () => {
            this.logger.error(`Mongoose disconnected.`);
            this.connected = false;
        });

        mongoose.connection.on("error", (data) => {
            this.logger.error(`Error occurred on mongoose driver.`, data);
        });

        mongoose.connection.on("fullsetup", () => {
            this.logger.info(`Mongoose have performed full setup of connector!`)
        });

        mongoose.connection.on("all", () => {
            this.logger.info('Mongoose all nodes are connected!');
        });
    }

}
