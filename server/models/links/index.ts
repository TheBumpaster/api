import {ILinkModel, ILinkModelDocument, linkSchema} from './schema';
import {model} from "mongoose";

export const LinkModel: ILinkModel = model<ILinkModelDocument>("link", linkSchema, "links") as ILinkModel;
