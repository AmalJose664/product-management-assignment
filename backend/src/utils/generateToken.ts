import { ENVS } from "@/config/env.config.js";
import jwt, { JwtPayload } from "jsonwebtoken";


export const generateRefreshToken = (payload: { id: string, role: string }): string => {
	const token = jwt.sign(payload,
		ENVS.REFRESH_TOKEN_SECRET as string,
		{ expiresIn: ENVS.NODE_ENV === "production" ? "12h" : "24h" },
	)
	return token
}
export const generateAccessToken = (payload: { id: string, role: string }): string => {
	const token = jwt.sign(payload,
		ENVS.ACCESS_TOKEN_SECRET as string,
		{ expiresIn: ENVS.NODE_ENV === "production" ? "12h" : "24h" },
	)
	return token
}