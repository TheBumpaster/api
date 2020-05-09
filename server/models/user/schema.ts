import {Schema, Document, Model} from "mongoose";
import {
    createUser,
    deleteUser,
    findUserByEmail,
    findUserById,
    findUserByUsername,
    findUsers, savePasswordMiddleware,
    updateUserPassword,
    updateUserProfile, validateUserPassword
} from "./service";

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
    };

    validateUserPassword(password: string): boolean;
}

export interface IUserStatics {
    findUserByUsername(username: string): Promise<IUserModelDocument>;
    findUserByEmail(email: string): Promise<IUserModelDocument>;
    findUserById(id: string): Promise<IUserModelDocument>;
    findUsers(query?: object, limit?: number, skip?: number): Promise<IUserModelDocument[]>;

    updateUserPassword(password: string, username: string): Promise<IUserModelDocument>;
    updateUserProfile(profile: object, username: string): Promise<IUserModelDocument>;

    deleteUser(id: string): Promise<object>;
    createUser(username: string, email: string, password: string, profile?: object): Promise<IUserModelDocument>;
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

userSchema.static("updateUserPassword", updateUserPassword);
userSchema.static("updateUserProfile", updateUserProfile);

userSchema.static("deleteUser", deleteUser);
userSchema.static("createUser", createUser);

userSchema.method("validateUserPassword", validateUserPassword);
userSchema.pre("save", savePasswordMiddleware);

export type IUserModel = Model<IUserModelDocument> & IUserModelDocument & IUserStatics;
