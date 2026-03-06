import { IProductRepository } from "@/interfaces/repository/IProductRepo.js"
import { IProduct, Product } from "@/models/Product.js"
import { Model } from "mongoose"

class ProductRepository implements IProductRepository {
	private Product: Model<IProduct>
	constructor() {
		this.Product = Product
	}
	async create(data: Partial<IProduct>): Promise<IProduct> {
		const newProduct = new Product(data)
		await newProduct.save()
		return newProduct
	}
	async getProducts(): Promise<IProduct[]> {
		return await this.Product.find({ isDeleted: false }).limit(40)
	}
	async getProductById(id: string): Promise<IProduct | null> {
		return await this.Product.findOne({ _id: id, isDeleted: false })
	}
	async updateProduct(id: string, newData: Partial<IProduct>): Promise<IProduct | null> {
		return await this.Product.findByIdAndUpdate(id, newData, { new: true })
	}
	async deleteProducts(id: string): Promise<boolean> {
		const result = await this.Product.updateOne({ _id: id, }, { $set: { isDeleted: true } })
		return result.modifiedCount > 0
	}
}

export default ProductRepository