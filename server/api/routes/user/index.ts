import {Router} from "express";
import {UserController} from "../../controllers/UserController";

export class UserRouter {
    private router: Router = Router();

    public getRouter(): Router {

        this.router.get("/query", UserController.listUsers);

        this.router.get("/:username", UserController.getUser);

        this.router.post("/new", UserController.newUser);

        this.router.put("/:username", UserController.updateUser);

        this.router.delete("/:id", UserController.deleteUser);

        return this.router;
    }
}
