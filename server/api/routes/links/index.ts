import {Router} from "express";
import {LinkController} from "../../controllers/LinkController";

export class LinksRouter {
    private router: Router = Router();

    public getRouter(): Router {

        this.router.get("/query", LinkController.listLinks);

        this.router.get("/:id", LinkController.getLink);

        this.router.post("/new", LinkController.newLink);

        this.router.delete("/:id", LinkController.deleteLink);

        return this.router;
    }
}
