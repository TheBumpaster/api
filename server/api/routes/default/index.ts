import {Router, Request, Response} from "express";
import {ResponseBuilder} from "../../../services/builders/ResponseBuilder";
import {Logger} from "../../../services/logger";
import {AuthController} from "../../controllers/AuthController";

/**
 * Main Router Set
 */
export class DefaultRouter {
    private router: Router = Router();
    private logger: Logger = new Logger(__filename);

    public getRouter(): Router {

        this.router.get("/info", (request: Request, response: Response) => {
            this.logger.info("API Call : /info ");
            return new ResponseBuilder().build(response)
                .setStatus(200)
                .setData({message: "Default info", date: Date()})
                .finish();
        });

        // Add authorization routes

        this.router.post("/auth/login", AuthController.login);
        this.router.post("/auth/register", AuthController.register);
        return this.router;
    }
}

