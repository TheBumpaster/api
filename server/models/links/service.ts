import {ILinkModel} from "./schema";
import {Logger} from "../../services/logger";

const logger: Logger = new Logger(__filename);
/**
 * Mongoose static service
 * @param userId
 * @param query
 * @param limit
 * @param skip
 */
export async function findLinks(userId: string, query?: object, limit = 200, skip = 0) {
    logger.info(`findLinks query: ${!!query ? JSON.stringify(query) : "none"}, limit: ${limit}, skip: ${skip}`);
    // @ts-ignore
    const model: ILinkModel = this;
    if (query !== undefined) {
        // @ts-ignore
        query.userId = userId;
    }

    return model.find(query !== undefined ? query : {userId})
        .limit(limit)
        .skip(skip)
        .lean()
        .exec();
}

/**
 * Mongoose static service
 * @param id
 */
export async function findLinkById(id: string) {
    logger.info(`findLinkById id: ${id}`);
    // @ts-ignore
    const model: ILinkModel = this;
    return model.findOne({id})
        .lean()
        .exec();
}

/**
 * Mongoose static service
 * @param id
 */
export async function deleteLink(id: string) {
    logger.info(`deleteLink id: ${id}`);
    // @ts-ignore
    const model: ILinkModel = this;
    return model.deleteOne({id})
        .lean().exec();
}

/**
 * Mongoose static service
 */
export async function createLink(userId: string, url: string, name: string, tags?: string[]) {
    logger.info(`createLink userId: ${userId} url: ${url} name: ${name} `);
    // @ts-ignore
    const model: ILinkModel = this;
    return model.create({
        userId, url, name, tags
    });
}
