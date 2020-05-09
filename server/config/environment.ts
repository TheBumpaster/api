import {DotenvConfigOutput, DotenvConfigOptions, config} from "dotenv";
import {Logger} from "../services/logger";

export class Environment {

    private dotEnvConfigOptions: DotenvConfigOptions;
    private dotenvConfigOutput: DotenvConfigOutput;
    private logger: Logger = new Logger(__filename);

    constructor(path: string, encoding = "utf8", debug = false) {
        this.dotEnvConfigOptions = {
            path,
            encoding,
        };

        if (!!debug) {
            this.dotEnvConfigOptions.debug = true;
        }

        this.dotenvConfigOutput = config(this.dotEnvConfigOptions);

        if (this.dotenvConfigOutput.error !== undefined) {
            this.logger.error(`Environment setup error!`, this.dotenvConfigOutput.error);
        } else {
            this.logger.info(`Environment initialize successfully from ${path}`);
        }

    }

    public getErrors() {
        return this.dotenvConfigOutput.error;
    }

    public getEnvironment() {
        return this.dotenvConfigOutput.parsed;
    }
}
