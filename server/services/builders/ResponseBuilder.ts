import {Response} from "express";

export class ResponseBuilder {

    protected status: number;
    protected data: object;
    protected response: Response;

    public build(response: Response) {
        this.response = response;

        return this;
    }

    public setData(data: object) {
        this.data = data;

        return this;
    }

    public setStatus(status: number) {
        this.status = status;

        return this;
    }

    public finish() {
        return this.response.status(this.status)
            .json({
                meta: {
                    status: !!this.status
                },
                response: this.data
            });
    }

    constructor() {
        this.status = 999;
        this.data = null;
    }


}
