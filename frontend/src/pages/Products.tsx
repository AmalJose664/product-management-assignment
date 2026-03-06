import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext"
import { axiosInstance } from "../utils/axios";
import type { Product } from "../types/Product";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";

const Products = () => {
	const { products, user, setProducts } = useApp()
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {

		const fetchProducts = async () => {
			try {
				if (products.length > 0) {
					setIsLoading(false)
					return
				}
				const response = await axiosInstance.get("/product");
				setProducts(response.data.products);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false)
			}
		};
		fetchProducts();

	}, []);
	// const repeated = products.length > 0 ? Array.from({ length: 30 }, (_, i) => products[i % products.length]) as Product[] : []
	const navigate = useNavigate()
	const isAdmin = user?.role === "ADMIN"

	if (isLoading) {
		return <Loading />
	}
	return (
		<div className="flex items-center mt-20 justify-center flex-col">
			<h3 className="text-2xl font-semibold ">Products</h3>
			<div className="flex flex-col">
				{isAdmin &&
					(<div className="ml-auto mr-20">
						<button onClick={() => navigate("/products/add")} className="border border-gray-600!">Add new Product <span className="ml-4 text-[20px] font-bold">+</span></button>

					</div>)}
				{products.length > 0 ? (
					<div className="mt-4 grid grid-cols-6">
						{products.map((product, i) => (
							<Link to={"/products/" + product._id} key={product._id + i}
								className="border min-w-20 text-gray-300! border-gray-700 rounded-md px-4 py-2 min-h-10 mx-4 my-2 space-y-3">
								<div>
									<p>Name: {product.name}</p>
								</div>
								<div>
									<p>Price: {product.price} ₹</p>
								</div>
								<div className="max-w-xl">
									<p className="truncate max-w-xl">{product.description}</p>
								</div>

								<div>
									<span className="border border-gray-600 rounded-full px-3 py-1">{product.category}</span>
								</div>
							</Link>
						))}
					</div>
				) : (
					<div>
						<p>No products yet</p>
					</div>
				)}
			</div>
		</div>
	)
}
export default Products