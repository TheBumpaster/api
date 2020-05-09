import {Request, Response} from "express";
import {Logger} from "../../services/logger";
import {ResponseBuilder} from "../../services/builders/ResponseBuilder";
import {UserModel} from "../../models/user";
const logger: Logger = new Logger(__filename);

export class UserController {

    /** Static resource for UserRouter
     * this.router.get("/list", UserController.listUsers);
     * @param request
     * @param response
     */
    public static async listUsers(request: Request, response: Response) {
        logger.info("List Users");
        try {
            let query = {};
            let limit = 200;
            let skip = 0;

            if (!!request.query.query) {
                logger.info(`List Users Query ${!!request.query.query}`);

                query = request.query.query;
            }
            if (!!request.query.limit) {
                logger.info(`List Users Limit ${!!request.query.limit}`);
                limit = Number(request.query.limit);
            }
            if (!!request.query.skip) {
                logger.info(`List Users Skip ${!!request.query.skip}`);
                skip = Number(request.query.skip);
            }

            const userList = await UserModel.findUsers(query, limit, skip);

            return new ResponseBuilder()
                .build(response)
                .setStatus(200)
                .setData({
                    users: userList,
                })
                .finish();

        } catch (error) {
            logger.error("List Users Error");
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
    public static async getUser(request: Request, response: Response) {
        logger.info("Get User by username");

        if (!request.params.username) {
            logger.warn("getUser - Invalid request parameters");

            return new ResponseBuilder()
                .build(response)
                .setStatus(400)
                .setData({message: "Invalid request parameters."})
                .finish();
        }

        try {

            const user = await UserModel.findUserByUsername(request.params.username);
            return new ResponseBuilder()
                .build(response)
                .setStatus(200)
                .setData({
                    user
                })
                .finish();

        } catch (error) {

            logger.error("getUser - Error");
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
    public static async newUser(request: Request, response: Response) {
        logger.info(`new user request`);
        if(Object.keys(request.body).length < 1) {

            logger.warn("newUser - Invalid body parameters");

            return new ResponseBuilder()
                .build(response)
                .setStatus(400)
                .setData({message: "Invalid body parameters."})
                .finish();

        }

        try {

            const user = await UserModel.createUser(request.body.username, request.body.email, request.body.password, request.body.profile);
            return new ResponseBuilder()
                .build(response)
                .setStatus(200)
                .setData({
                    user
                })
                .finish();

        } catch (error) {

            logger.error("newUser - Error");
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
    public static async updateUser(request: Request, response: Response) {
        logger.info(`update user request`);

        if (!request.params.username) {

            logger.warn("updateUser - Invalid request parameters");

            return new ResponseBuilder()
                .build(response)
                .setStatus(400)
                .setData({message: "Invalid request parameters."})
                .finish();
        }

        try {
            // Check if user exists
            const user = await UserModel.findUserByUsername(request.params.username);
            if (!user) {
                return new ResponseBuilder()
                    .build(response)
                    .setStatus(400)
                    .setData({message: "User does not exist."})
                    .finish();
            }

            // Validate profile
            if (Object.keys(request.body).length < 1) {
                return new ResponseBuilder()
                    .build(response)
                    .setStatus(400)
                    .setData({message: "Invalid body parameters."})
                    .finish();
            }

            return new ResponseBuilder()
                .build(response)
                .setStatus(200)
                .setData({
                    user: await UserModel.updateUserProfile(request.body, user.username)
                })
                .finish();

        } catch (error) {

            logger.error("updateUser - Error");
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
    public static async deleteUser(request: Request, response: Response) {
        logger.info(`delete user`);
        if (!request.params.id) {

            logger.warn("deleteUser - Invalid request parameters");

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
                    result: await UserModel.deleteUser(request.params.id)
                })
                .finish();

        } catch (error) {

            logger.error("deleteUser - Error");

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
