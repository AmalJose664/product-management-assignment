import mongoose, { Document, Schema, Types } from "mongoose";


export interface IUser extends Document {
	name: string
	email: string
	password: string
	role: string
	createdAt: Date
}

export enum RoleTypes {
	ADMIN = "ADMIN",
	USER = "USER",
}
const userSchema = new Schema<IUser>({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, enum: Object.values(RoleTypes), default: RoleTypes.USER, required: true },
	createdAt: { type: Date, required: true, default: new Date() },
}
)

export const User = mongoose.model<IUser>("User", userSchema)