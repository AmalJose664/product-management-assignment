import { Request, Response, NextFunction } from "express";
import AppError from "@/utils/AppError.js";
import { COMMON_ERRORS } from "@/constants/errors.js";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
	let statusCode = err.statusCode || 500;
	let message = err.message || COMMON_ERRORS.INTERNAL_SERVER;

	console.log(err);

	if (!(err instanceof AppError)) {
		console.error("Unhandled Error:", err);
		message = COMMON_ERRORS.SOMETHING_WENT_WRONG;
	}

	const errorResponse = {
		message,
		statusCode,
	};
	res.status(statusCode).json(errorResponse);
}