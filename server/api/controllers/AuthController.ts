import {Logger} from "../../services/logger";
import {Request, Response} from "express";
import {ResponseBuilder} from "../../services/builders/ResponseBuilder";
import * as jwt from "jsonwebtoken";
import {UserModel} from "../../models/user";

const logger: Logger = new Logger(__filename);

export class AuthController {

    /**
     *
     * @param request
     * @param response
     */
    public static async login(request: Request, response: Response) {
        logger.info(`new login request.`);

        if (!request.body.username || !request.body.password) {

            logger.warn(`login request: invalid body parameters`);

            return new ResponseBuilder()
                .build(response)
                .setStatus(400)
                .setData({message: "Invalid body parameters."})
                .finish();

        }

        try {
            // Find user
            const user = await UserModel.findUserByUsername(request.body.username);
            if (!user) {
                logger.warn(`new login request. User doesn't exist.`);
                return new ResponseBuilder()
                    .build(response)
                    .setStatus(400)
                    .setData({message: "User does not exist."})
                    .finish();
            }
            const passwordCheck = user.validateUserPassword(request.body.password);
            if (!passwordCheck) {
                logger.warn(`new login request. password missmatch`);

                return new ResponseBuilder()
                    .build(response)
                    .setStatus(400)
                    .setData({message: "Username or password doesn't match."})
                    .finish();
            }

            const token = jwt.sign({ user }, process.env.JWT_SECRET as string, {algorithm: "HS256", expiresIn: process.env.JWT_EXPIRY});

            return new ResponseBuilder()
                .build(response)
                .setStatus(200)
                .setData({message: "Logged in successfully.", token})
                .finish();

        } catch (error) {

            logger.error(`new login request. error`);
            console.log(error);

            return new ResponseBuilder()
                .build(response)
                .setStatus(500)
                .setData({error})
                .finish();

        }
    }

    /**
     *
     * @param request
     * @param response
     */
    public static async register(request: Request, response: Response) {
        logger.info(`new register request.`);

        if (!request.body.username || !request.body.password || !request.body.email) {

            logger.warn(`register request: invalid body parameters`);

            return new ResponseBuilder()
                .build(response)
                .setStatus(400)
                .setData({message: "Invalid body parameters."})
                .finish();

        }

        try {
            // Find user
            const user = await UserModel.findUserByUsername(request.body.username);
            if (user) {
                logger.warn(`new register request. User already exist.`);
                return new ResponseBuilder()
                    .build(response)
                    .setStatus(400)
                    .setData({message: "User already exist."})
                    .finish();
            }

            const newUser = await UserModel.createUser(request.body.username, request.body.email, request.body.password, request.body.profile);
            const token = jwt.sign({ user }, process.env.JWT_SECRET as string, {algorithm: "HS256", expiresIn: process.env.JWT_EXPIRY});

            return new ResponseBuilder()
                .build(response)
                .setStatus(400)
                .setData({user: newUser, token})
                .finish();
        } catch (error) {

            logger.error(`new register request. error`);
            console.log(error);

            return new ResponseBuilder()
                .build(response)
                .setStatus(500)
                .setData({error})
                .finish();

        }
    }
}
