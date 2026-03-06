import { NextFunction, Request, Response } from "express";
export interface IAuthController {
	login(req: Request, res: Response, next: NextFunction): Promise<void>
	getAuthenticatedUser(req: Request, res: Response, next: NextFunction): Promise<void>
	signup(req: Request, res: Response, next: NextFunction): Promise<void>
	checkAuth(req: Request, res: Response, next: NextFunction): void

}