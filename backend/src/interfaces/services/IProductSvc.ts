import { ProductDTO } from "@/dtos/product.dto.js";
import { IProduct } from "@/models/Product.js";

export interface IProductSvc {
	addNewProduct(productData: ProductDTO, createdBy: string): Promise<IProduct>
	findAllProducts(): Promise<IProduct[]>
	findAllProductById(id: string): Promise<IProduct>
	updateProduct(id: string, productData: ProductDTO): Promise<IProduct>
	deleteProduct(id: string): Promise<boolean>
}