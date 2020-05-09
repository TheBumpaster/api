import {Schema, Document, Model} from "mongoose";
import {findUserByEmail, findUserById, findUserByUsername, findUsers} from "./service";

export interface IUserModelDocument extends Document {
    id: string;
    username: string;
    email: string;
    password: string;
    profile?: {
        firstname?: string,
        lastname?: string,
        gravatar?: string,
        phone?: string;
    }
}

export interface IUserStatics {
    findUserByUsername(username: string): Promise<IUserModelDocument>;
    findUserByEmail(email: string): Promise<IUserModelDocument>;
    findUserById(id: string): Promise<IUserModelDocument>;
    findUsers(query?: object, limit?: number, skip?: number): Promise<IUserModelDocument[]>;
}

export const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },

    profile: Schema.Types.Mixed,
}, {
    timestamps: true,
    id: true,
});

userSchema.static("findUserByUsername", findUserByUsername);
userSchema.static("findUserByEmail", findUserByEmail);
userSchema.static("findUserById", findUserById);
userSchema.static("findUsers", findUsers);

export type IUserModel = Model<IUserModelDocument> & IUserModelDocument & IUserStatics;
