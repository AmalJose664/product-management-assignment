import { COMMON_ERRORS } from "@/constants/errors.js"
import { STATUS_CODES } from "@/constants/statusCodes.js"
import { ProductDTO } from "@/dtos/product.dto.js"
import { IProductRepository } from "@/interfaces/repository/IProductRepo.js"
import { IAuthSvc } from "@/interfaces/services/IAuthSvc.js"
import { IProductSvc } from "@/interfaces/services/IProductSvc.js"
import { IProduct } from "@/models/Product.js"
import AppError from "@/utils/AppError.js"
import { Types } from "mongoose"

class ProductService implements IProductSvc {
	private productRepo: IProductRepository
	private userService: IAuthSvc
	constructor(repo: IProductRepository, authSvc: IAuthSvc) {
		this.productRepo = repo
		this.userService = authSvc
	}

	async addNewProduct(productData: ProductDTO, requestUserId: string): Promise<IProduct> {
		return this.productRepo.create({ ...productData, createdBy: new Types.ObjectId(requestUserId) })
	}
	async findAllProducts(): Promise<IProduct[]> {
		return this.productRepo.getProducts()
	}
	async findAllProductById(id: string): Promise<IProduct> {
		const product = await this.productRepo.getProductById(id)
		if (!product) {
			throw new AppError(COMMON_ERRORS.NOT_FOUND, STATUS_CODES.NOT_FOUND)
		}
		return product
	}
	async updateProduct(id: string, productData: ProductDTO): Promise<IProduct> {
		const existingProduct = await this.productRepo.getProductById(id)

		if (!existingProduct) {
			throw new AppError(COMMON_ERRORS.NOT_FOUND, STATUS_CODES.NOT_FOUND)
		}
		const updated = await this.productRepo.updateProduct(id, productData) as IProduct
		return updated
	}
	async deleteProduct(id: string): Promise<boolean> {
		const existingProduct = await this.productRepo.getProductById(id)
		console.log(existingProduct, " < <")
		if (!existingProduct) {
			throw new AppError(COMMON_ERRORS.NOT_FOUND, STATUS_CODES.NOT_FOUND)
		}
		return this.productRepo.deleteProducts(id)
	}

}

export default ProductService