import { mongoIdSchema } from "@/dtos/product.dto.js";

export function validatedObjectId(id: string): string {
	const validated = mongoIdSchema.parse(id)
	return validated
}