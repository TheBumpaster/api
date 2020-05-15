import {Request, Response} from "express";
import {Logger} from "../../services/logger";
import {ResponseBuilder} from "../../services/builders/ResponseBuilder";
import {LinkModel} from "../../models/links";
import {parse, serialize} from "parse5";
import requestPromise from "request-promise";
import {AuthorizedRequest} from "../index";
import {IUserModelDocument} from "../../models/user/schema";

const logger: Logger = new Logger(__filename);

export class LinkController {

    /** Static resource for UserRouter
     * this.router.get("/list", LinkController.listLinks);
     * @param request
     * @param response
     */
    public static async listLinks(request: AuthorizedRequest, response: Response) {
        logger.info("List Links");
        const payload = request.payload as { user: IUserModelDocument };
        try {
            let query = {};
            let limit = 200;
            let skip = 0;

            if (!!request.query.query) {
                logger.info(`List Links Query user ${payload.user.username}`);

                query = request.query.query;
            }
            if (!!request.query.limit) {
                logger.info(`List Links Limit ${request.query.limit}`);
                limit = Number(request.query.limit);
            }
            if (!!request.query.skip) {
                logger.info(`List Links Skip ${request.query.skip}`);
                skip = Number(request.query.skip);
            }

            const linkList = await LinkModel.findLinks(payload.user._id, query, limit, skip);

            return new ResponseBuilder()
                .build(response)
                .setStatus(200)
                .setData({
                    links: linkList,
                })
                .finish();

        } catch (error) {
            logger.error("List Links Error");
            return new ResponseBuilder()
                .build(response)
                .setStatus(500)
                .setData({
                    error
                })
                .finish();
        }
    }

    /**
     * Static resource for UserRouter
     * @param request
     * @param response
     */
    public static async getLink(request: Request, response: Response) {
        logger.info("Get Link by Id");

        if (!request.params.id) {
            logger.warn("getLink - Invalid request parameters");

            return new ResponseBuilder()
                .build(response)
                .setStatus(400)
                .setData({message: "Invalid request parameters."})
                .finish();
        }

        try {

            const link = await LinkModel.findLinkById(request.params.id);
            return new ResponseBuilder()
                .build(response)
                .setStatus(200)
                .setData({
                    link
                })
                .finish();

        } catch (error) {

            logger.error("getLink - Error");
            console.log(error);

            return new ResponseBuilder()
                .build(response)
                .setStatus(500)
                .setData({
                    error
                })
                .finish();

        }
    }

    /**
     * Static resource for UserRouter
     * @param request
     * @param response
     */
    public static async newLink(request: AuthorizedRequest, response: Response) {
        logger.info(`new link request`);
        const payload = request.payload as { user: IUserModelDocument };

        if(!request.body.link || !payload.user) {

            logger.warn("newLink - Invalid body parameters");

            return new ResponseBuilder()
                .build(response)
                .setStatus(400)
                .setData({message: "Invalid body parameters."})
                .finish();

        }

        try {

            const urlResponse = await requestPromise.get(request.body.link);
            const document = parse(urlResponse, {
                scriptingEnabled: false,
            });

            // get html to string. remove html element tags
            const linkContent = serialize(document).replace(/<\/?[^>]+(>|$)/g, "")
                .replace(/\r?\n|\r/g, "");

            // split each word
            // Dump empty matches
            // Dump duplicates
            const matches = linkContent.split(/\s/g)
                .filter((value) => {return value.length > 1})
                .filter((a, i, aa) => aa.indexOf(a) === i && aa.lastIndexOf(a) !== i);

            console.log(payload.user);
            const link = await LinkModel.createLink(payload.user._id, request.body.link, matches[0], matches);

            return new ResponseBuilder()
                .build(response)
                .setStatus(200)
                .setData({
                    link
                })
                .finish();

        } catch (error) {

            logger.error("newLink - Error");
            console.log(error);

            return new ResponseBuilder()
                .build(response)
                .setStatus(500)
                .setData({
                    error
                })
                .finish();

        }
    }
    /**
     *
     * @param request
     * @param response
     */
    public static async deleteLink(request: Request, response: Response) {
        logger.info(`delete link`);
        if (!request.params.id) {

            logger.warn("deleteLink - Invalid request parameters");

            return new ResponseBuilder()
                .build(response)
                .setStatus(400)
                .setData({message: "Invalid request parameters."})
                .finish();
        }

        try {
            return new ResponseBuilder()
                .build(response)
                .setStatus(200)
                .setData({
                    result: await LinkModel.deleteLink(request.params.id)
                })
                .finish();

        } catch (error) {

            logger.error("deleteLink - Error");

            return new ResponseBuilder()
                .build(response)
                .setStatus(500)
                .setData({
                    error
                })
                .finish();

        }
    }
}
