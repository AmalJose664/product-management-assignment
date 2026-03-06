import { COMMON_ERRORS } from "@/constants/errors.js"
import { STATUS_CODES } from "@/constants/statusCodes.js"
import { ProdcutSchema, ProductDTO } from "@/dtos/product.dto.js"
import { IProductController } from "@/interfaces/controllers/IProductController.js"
import { IProductSvc } from "@/interfaces/services/IProductSvc.js"
import AppError from "@/utils/AppError.js"
import { validatedObjectId } from "@/utils/validateObjectId.js"
import { printZodError } from "@/utils/zodUtils.js"
import { NextFunction, Request, Response } from "express"
import { ZodError, formatError } from "zod"


class ProductController implements IProductController {
	private productService: IProductSvc

	constructor(productSvc: IProductSvc) {
		this.productService = productSvc
	}

	async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const newProductData = req.body
			const validatedResult = ProdcutSchema.safeParse(newProductData)

			if (validatedResult.error || !validatedResult.success) {
				const errorStrings = printZodError(validatedResult)
				throw new AppError(COMMON_ERRORS.VALIDATION_ERRORS(errorStrings, "Product"), STATUS_CODES.BAD_REQUEST)
			}
			const data = validatedResult.data as ProductDTO
			const user = req.user
			const newProduct = await this.productService.addNewProduct(data, user.id)

			const mappedData = {
				_id: newProduct._id.toString(),
				name: newProduct.name,
				price: newProduct.price,
				description: newProduct.description,
				category: newProduct.category,
				createdBy: newProduct.createdBy,
				createdAt: newProduct.createdAt,
			}
			res.status(STATUS_CODES.CREATED).json({ product: mappedData })

		} catch (error) {
			next(error)
		}

	}
	async getProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {

			const products = await this.productService.findAllProducts()
			const mappedData = products.map((p) => ({
				_id: p._id.toString(),
				name: p.name,
				price: p.price,
				description: p.description,
				category: p.category,
				createdBy: p.createdBy,
				createdAt: p.createdAt,
			}))
			res.status(STATUS_CODES.OK).json({ products: mappedData })

		} catch (error) {
			next(error)
		}
	}


	async getProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {

			const productId = validatedObjectId(req.params.id as string)

			const product = await this.productService.findAllProductById(productId)
			if (!product) {
				throw new AppError(COMMON_ERRORS.NOT_FOUND, STATUS_CODES.NOT_FOUND)
			}
			const mappedData = {
				_id: product._id.toString(),
				name: product.name,
				price: product.price,
				description: product.description,
				category: product.category,
				createdBy: product.createdBy,
				createdAt: product.createdAt,
			}
			res.status(STATUS_CODES.OK).json({ product: mappedData })
		} catch (error) {

			if (error instanceof ZodError) {
				const formattedErrors = formatError(error)._errors
				next(new AppError(formattedErrors.join("; "), STATUS_CODES.BAD_REQUEST))
				return
			}
			next(error)
		}
	}


	async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {

		try {

			const productId = validatedObjectId(req.params.id as string)
			const newProductData = req.body
			const validatedResult = ProdcutSchema.safeParse(newProductData)

			if (validatedResult.error || !validatedResult.success) {
				const errorStrings = printZodError(validatedResult)
				throw new AppError(COMMON_ERRORS.VALIDATION_ERRORS(errorStrings, "Product"), STATUS_CODES.BAD_REQUEST)
			}
			const data = validatedResult.data as ProductDTO
			const product = await this.productService.updateProduct(productId, data)

			const mappedData = {
				_id: product._id.toString(),
				name: product.name,
				price: product.price,
				description: product.description,
				category: product.category,
				createdBy: product.createdBy,
				createdAt: product.createdAt,
			}

			res.status(STATUS_CODES.OK).json({ product: mappedData })

		} catch (error) {
			next(error)
		}
	}


	async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const productId = validatedObjectId(req.params.id as string)
			const result = await this.productService.deleteProduct(productId)

			res.status(STATUS_CODES.OK).json({ result: result })
		} catch (error) {
			next(error)
		}
	}
}

export default ProductController