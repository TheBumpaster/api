import {Application} from "./app";
import {Database} from "./config/database";
import {Environment} from "./config/environment";
import {join} from "path";

const environment = new Environment(join(__dirname, "../.env"));
const database = new Database(Database.generateURI(process.env.MONGO_HOST as string, process.env.MONGO_PORT as string, process.env.MONGO_DB as string));
const application = new Application(process.env.PORT as string, process.env.HOST as string);

export default {environment, database, application};
