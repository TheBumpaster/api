import {Response, NextFunction} from "express";
import {ResponseBuilder} from "../../services/builders/ResponseBuilder";
import {Logger} from "../../services/logger";
import * as jwt from "jsonwebtoken";
import {AuthorizedRequest} from "../index";

const logger: Logger = new Logger();

export function authorize(request: AuthorizedRequest, response: Response, next: NextFunction) {
    logger.info("Authorizing request");
    const token = request.headers.authorization;
    if (!token) {
        logger.warn("Authorizing request. Request headers don't have token.");
        return new ResponseBuilder()
            .build(response)
            .setStatus(401)
            .setData({
                message: "Invalid token!"
            }).finish();
    }

    let payload;

    try {
        payload = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {

            return new ResponseBuilder()
                .build(response)
                .setStatus(401)
                .setData({error: error.message})
                .finish();

        }

        return new ResponseBuilder()
            .build(response)
            .setStatus(400)
            .setData({error})
            .finish();
    }

    request.user = payload;

    next();
}
