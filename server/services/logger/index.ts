import {Logger as wLogger, createLogger, transports, format} from "winston";

export class Logger {
    protected util: wLogger;

    constructor(context = "Logger") {
        const consoleTransport = new transports.Console();
        const fileErrorTransport = new transports.File({
            filename: "error.log", level: "error"
        });
        const defaultLogFormat = format.printf(( {level, message, label, timestamp}) => {
            return `[ ${timestamp} ] :: [${level}] | ${label} |: ${message}`
        });

        const loggerOptions = {
            level: "debug",
            format: format.combine(format.label({label: context, message: false}), format.timestamp(), defaultLogFormat),
            transports: [consoleTransport, fileErrorTransport]
        };

        this.util = createLogger(loggerOptions);

    }

    public log(message: string, data?: any, level = "debug"): void {
        if (data !== undefined) {
            this.util.log(level, message, data);
        } else {
            this.util.log(level, message)
        }
    }

    public info(message: string, data?: any): void {
        this.util.log("info", message, !!data ? data : "INFO");
    }

    public warn(message: string, data?: any): void {
        this.util.log("warn", message, !!data ? data : "WARNING");
    }

    public error(message: string, data?: any): void {
        this.util.log("error", message, data);
    }
}
