import { NextFunction, Request, Response } from "express"



export interface IProductController {
	createProduct(req: Request, res: Response, next: NextFunction): Promise<void>
	getProducts(req: Request, res: Response, next: NextFunction): Promise<void>
	getProduct(req: Request, res: Response, next: NextFunction): Promise<void>
	updateProduct(req: Request, res: Response, next: NextFunction): Promise<void>
	deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void>

}