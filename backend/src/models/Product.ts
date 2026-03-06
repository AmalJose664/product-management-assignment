import mongoose, { Document, Schema, Types } from "mongoose";
export interface IProduct extends Document {
	name: string,
	description: string
	price: number
	category: string
	createdBy: Types.ObjectId | string
	isDeleted: boolean
	createdAt: Date
}

const productSchema = new Schema<IProduct>({
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	category: { type: String, required: true },
	isDeleted: { type: Boolean, default: false },
	createdBy: { type: Types.ObjectId, ref: "User", required: true },
	createdAt: { type: Date, required: true, default: new Date() },

}
)

export const Product = mongoose.model<IProduct>("Product", productSchema)