import "dotenv/config";
import { z } from "zod";
import { ZodError } from "zod/v3";

const envSchema = z.object({
	MONGO_URL: z.url(),
	FRONTEND_URL: z.url(),
	REFRESH_TOKEN_SECRET: z.string(),
	ACCESS_TOKEN_SECRET: z.string(),
	PORT: z.coerce.number(),
	API_ENDPOINT: z.url(),
	NODE_ENV: z.string(),
});
function validateEnv() {
	try {
		const envs = envSchema.parse(process.env);
		console.log("Env validation passed ");
		return envs;
	} catch (err) {
		const error = err as ZodError;
		console.error(" Environment validation failed:");
		console.log(error);
		process.exit(1);
	}
}
export const ENVS = validateEnv();
