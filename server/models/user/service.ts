import {IUserModel, IUserModelDocument} from "./schema";
import {Logger} from "../../services/logger";
import * as crypto from "crypto-js";
const logger: Logger = new Logger(__filename);

/**
 * Mongoose static service
 * @param query
 * @param limit
 * @param skip
 */
export async function findUsers(query?: object, limit = 200, skip = 0) {
    logger.info(`findUsers query: ${!!query ? query.toString() : "none"}, limit: ${limit}, skip: ${skip}`);
    // @ts-ignore
    const model: IUserModel = this;

    return model.find(query !== undefined ? query : {}, {password: 0})
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
    // @ts-ignore
    const model: IUserModel = this;
    return model.findOne({username}, {password: 0})
        .lean()
        .exec();
}

/**
 * Mongoose static service
 * @param email
 */
export async function findUserByEmail(email: string) {
    logger.info(`findUserByEmail email: ${email}`);
    // @ts-ignore
    const model: IUserModel = this;
    return model.findOne({email}, {password: 0})
        .lean()
        .exec();
}

/**
 * Mongoose static service
 * @param id
 */
export async function findUserById(id: string) {
    logger.info(`findUserById id: ${id}`);
    // @ts-ignore
    const model: IUserModel = this;
    return model.findOne({id})
        .lean()
        .exec();
}

/**
 * Mongoose static service
 * @param password
 * @param username
 */
export async function updateUserPassword(password: string, username: string) {
    logger.info(`updateUserPassword username: ${username}`);
    // @ts-ignore
    const model: IUserModel = this;
    return model.updateOne({username}, {password}, {upsert: false})
        .lean().exec();
}

/**
 * Mongoose static service
 * @param profile
 * @param username
 */
export async function updateUserProfile(profile: object, username: string) {
    logger.info(`updateUserProfile username: ${username}`);
    // @ts-ignore
    const model: IUserModel = this;
    return model.updateOne({username}, {
        $set: {
            profile
        }
    }).lean().exec();
}

/**
 * Mongoose static service
 * @param id
 */
export async function deleteUser(id: string) {
    logger.info(`deleteUser id: ${id}`);
    // @ts-ignore
    const model: IUserModel = this;
    return model.deleteOne({id})
        .lean().exec();
}

/**
 * Mongoose static service
 * @param username
 * @param email
 * @param password
 * @param role
 * @param profile
 */
export async function createUser(username: string, email: string, password: string, role?: string, profile?: object) {
    logger.info(`createUser username: ${username} email: ${email} `);
    // @ts-ignore
    const model: IUserModel = this;

    return model.create({
        username, email, password, profile, role
    });
}

/**
 * Mongoose object method
 * @param cPassword
 */
export function validateUserPassword(cPassword: string) {
    // @ts-ignore
    const userDocument: IUserModelDocument = this;

    return userDocument.password === crypto.SHA3(cPassword, {outputLength: 256}).toString();
}


/**
 * Static function
 * @param cPassword
 * @param oldPassword
 */
export function comparePasswords(cPassword: string, oldPassword: string) {
    return oldPassword === crypto.SHA3(cPassword, {outputLength: 256}).toString();
}

/**
 * Mongoose Event Resource
 * @param next
 */
export function savePasswordMiddleware(next: Function) {
    // @ts-ignore
    this.password = passwordHashingMiddleware(this.password);
    next();
}
function passwordHashingMiddleware(password: string) {
    return crypto.SHA3(password, {outputLength: 256}).toString();
}
