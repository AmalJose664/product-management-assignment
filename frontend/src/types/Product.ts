
export type Product = {
	_id: string
	name: string
	description: string
	createdBy: string
	createdAt: string
	category: string
	price: number
}
export type ProductAddType = {
	name: string
	description: string
	category: string
	price: number
}