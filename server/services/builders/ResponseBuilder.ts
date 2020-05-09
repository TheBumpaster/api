import {Response} from "express";

export class ResponseBuilder {

    protected status: number | undefined;
    protected data: object | undefined;
    protected response: Response | undefined;

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
        if (this.response !== undefined) {
            return this.response.status(this.status as number)
                .json({
                    meta: {
                        status: !!this.status
                    },
                    response: this.data
                });
        }
    }


}
