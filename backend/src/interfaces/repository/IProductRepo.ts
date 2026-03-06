import { IProduct } from "@/models/Product.js";

export interface IProductRepository {
	create(data: Partial<IProduct>): Promise<IProduct>
	getProducts(): Promise<IProduct[]>
	getProductById(id: string): Promise<IProduct | null>
	updateProduct(id: string, newData: Partial<IProduct>): Promise<IProduct | null>
	deleteProducts(id: string): Promise<boolean>
}