import { ENVS } from "@/config/env.config.js";
import { COMMON_ERRORS } from "@/constants/errors.js";
import { STATUS_CODES } from "@/constants/statusCodes.js";
import AppError from "@/utils/AppError.js";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


interface DecodedUser {
	id: string;
	role: string;
}

declare global {
	namespace Express {
		interface Request {
			user: DecodedUser
		}
	}
}


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	try {
		const authHeader = req.headers["authorization"] as string | null;
		if (!authHeader) {
			throw new AppError(COMMON_ERRORS.NO_TOKEN, STATUS_CODES.UNAUTHORIZED)
			return
		}
		const accessToken = authHeader.split(" ")[1];
		if (!accessToken) {
			throw new AppError(COMMON_ERRORS.NO_TOKEN, STATUS_CODES.UNAUTHORIZED)
			return
		}
		const decoded = jwt.verify(accessToken, ENVS.ACCESS_TOKEN_SECRET) as DecodedUser;
		req.user = decoded;
		if (!req.user) {
			throw new AppError(COMMON_ERRORS.NOT_AUTHENTICATED, STATUS_CODES.UNAUTHORIZED);
			return;
		}
		next();
	} catch (error) {
		if (error instanceof AppError) {
			next(error)
			return
		}
		console.log(error, " <<<")
		next(new AppError(COMMON_ERRORS.TOKEN_VALIDATION + "  " + (error as any).message, STATUS_CODES.UNAUTHORIZED))
	}


}