import { COMMON_ERRORS } from "@/constants/errors.js";
import { STATUS_CODES } from "@/constants/statusCodes.js";
import AppError from "@/utils/AppError.js";
import { NextFunction, Request, Response } from "express";



export const checkRole = (role: string) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const { user } = req
			if (user.role !== role) {
				throw new AppError(COMMON_ERRORS.FORBIDDEN, STATUS_CODES.FORBIDDEN)
			}
			next();
		} catch (error) {
			next(error)
		}
	}
}