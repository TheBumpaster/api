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
        logger.info("List Users Controller");
        const userList = await UserModel.findUsers();
        try {
            return new ResponseBuilder()
                .build(response)
                .setStatus(200)
                .setData({
                    message: "listUsers",
                    users: userList,
                })
                .finish();
        } catch (error) {
            return error;
        }
    }
}
