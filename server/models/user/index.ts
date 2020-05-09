import {IUserModel, IUserModelDocument, userSchema} from './schema';
import {model} from "mongoose";

export const UserModel: IUserModel = model<IUserModelDocument>("user", userSchema, "users") as IUserModel;
