import { CorsOptions } from "cors";
import { ENVS } from "@/config/env.config.js";

export const corsOptions: CorsOptions = {
	origin: ENVS.FRONTEND_URL,
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
	optionsSuccessStatus: 200,
};
