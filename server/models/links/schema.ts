import {Schema, Document, Model} from "mongoose";
import {createLink, deleteLink, findLinkById, findLinks} from "./service";

export interface ILinkModelDocument extends Document {
    _id: string;
    name: string;
    url: string;
    description?: string;
    tags?: string[];
    createdAt?: string;
    updatedAt?: string;
}

export interface ILinkStatics {
    findLinks(userId: string, query?: object, limit?: number, skip?: number): Promise<ILinkModelDocument[]>;
    findLinkById(id: string): Promise<ILinkModelDocument>;

    deleteLink(id: string): Promise<object>;
    createLink(userId: string, url: string, name: string, tags?: string[]): Promise<ILinkModelDocument>;
}

export const linkSchema: Schema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    tags: Schema.Types.Mixed,
}, {
    timestamps: true,
    id: true,
});

linkSchema.static("findLinks", findLinks);
linkSchema.static("findLinkById", findLinkById);

linkSchema.static("deleteLink", deleteLink);
linkSchema.static("createLink", createLink);


export type ILinkModel = Model<ILinkModelDocument> & ILinkModelDocument & ILinkStatics;
