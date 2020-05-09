import {Application} from "./app";
import {Database} from "./config/database";
import {Environment} from "./config/environment";
import {join} from "path";

const environment = new Environment(join(__dirname, "../.env"));
const database = new Database(Database.generateURI(process.env.MONGO_HOST, process.env.MONGO_PORT, process.env.MONGO_DB));
const application = new Application(process.env.PORT, process.env.HOST);

export default {application};
