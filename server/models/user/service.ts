import {IUserModel} from "./schema";
import {Logger} from "../../services/logger";

const logger: Logger = new Logger(__filename);
/**
 * Mongoose static service
 * @param query
 * @param limit
 * @param skip
 */
export async function findUsers(query?: object, limit = 200, skip = 0) {
    logger.info(`findUsers query: ${!!query ? query.toString() : "none"}, limit: ${limit}, skip: ${skip}`);
    const model: IUserModel = this;

    return model.find(query !== undefined ? query : {})
        .limit(limit)
        .skip(skip)
        .lean()
        .exec();
}

/**
 * Mongoose static service
 * @param username
 */
export async function findUserByUsername(username: string) {
    logger.info(`findUserByUsername username: ${username}`);

    const model: IUserModel = this;
    return model.findOne({username})
        .exec();
}

/**
 * Mongoose static service
 * @param email
 */
export async function findUserByEmail(email: string) {
    logger.info(`findUserByEmail email: ${email}`);

    const model: IUserModel = this;
    return model.findOne({email})
        .exec();
}

/**
 * Mongoose static service
 * @param id
 */
export async function findUserById(id: string) {
    logger.info(`findUserById id: ${id}`);
    const model: IUserModel = this;
    return model.findOne({id})
        .exec();
}
