import {Router} from "express";
import {UserController} from "../../controllers/UserController";

export class UserRouter {
    private router: Router = Router();

    public getRouter(): Router {
        
        this.router.get("/list", UserController.listUsers);

        return this.router;
    }
}
