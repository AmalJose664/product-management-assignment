import { availableCategories } from "@/constants/product.js";
import mongoose from "mongoose";
import z from "zod";


export const ProdcutSchema = z.object({
	name: z.string().max(60).min(3),
	description: z.string(),
	price: z.number(),
	category: z.enum(availableCategories, "Category must be from the list => " + `[${availableCategories.join(", ")}]`)
});


export const mongoIdSchema = z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), { message: "Invalid MongoDB ObjectId" });


export type ProductDTO = z.infer<typeof ProdcutSchema>;
