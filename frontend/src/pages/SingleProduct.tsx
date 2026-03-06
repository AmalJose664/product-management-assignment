import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { axiosInstance } from "../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import type { Product, ProductAddType } from "../types/Product";
import { availableCategories } from "../constants/product";
import Loading from "./Loading";

const Product = () => {
	const { selectedProduct: product, setSelectedProduct, user } = useApp()
	const { id: productId } = useParams()
	const [editMode, setEditMode] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [formData, setFormData] = useState<Partial<ProductAddType>>({ name: "", category: "", description: "", price: 0 })
	const [erros, setErrors] = useState("")

	const [isEditing, setIsEditing] = useState(false)
	const navigate = useNavigate()



	useEffect(() => {
		const fetchProducts = async () => {
			try {
				if (product?._id === productId) {
					setIsLoading(false)
					return
				}
				const response = await axiosInstance.get("/product/" + productId);
				const fetched = response.data.product
				setSelectedProduct(fetched);
				setFormData({
					name: fetched.name,
					category: fetched.category,
					description: fetched.description,
					price: fetched.price
				})
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false)
			}
		};
		fetchProducts();
	}, []);



	const handleDelete = async () => {
		try {
			await axiosInstance.delete("/product/" + product?._id)
			navigate("/products")

		} catch (error: any) {
			console.log(error.response.data.message)
			setErrors(error.response.data.message || "Error during saving product")
		}
	}
	const handleFormSubmit = async (e: React.SubmitEvent) => {
		e.preventDefault()
		const { name, category, description, price } = formData
		if (!name || !category || !description || !price) {
			setErrors("Please fill all fields")
			return
		}
		return await editProduct()
	}
	const editProduct = async () => {
		try {
			setIsEditing(true)
			const response = await axiosInstance.put("/product/" + product?._id, formData)
			const productAdded = response.data.product as Product
			setSelectedProduct(productAdded)

			setEditMode(false)

		} catch (error: any) {
			console.log(error.response.data.message)
			setErrors(error.response.data.message || "Error during saving product")
		} finally {
			setIsEditing(false)
		}
	}


	const isAdmin = user?.role === "ADMIN"

	if (isLoading) {
		return <Loading />
	}
	return (
		<div className="flex items-center mt-20 justify-center flex-col">
			<h3 className="text-2xl font-semibold ">Product Page</h3>
			<div>
				{product ? (
					<div className="mt-4 flex flex-col">
						{(isAdmin) &&
							(<div className="ml-auto">
								<button onClick={() => setEditMode(!editMode)} className="border border-gray-600!">
									{editMode ? "Close Edit" : "Edit Product"}
									<span className="ml-4 text-[20px] font-bold inline-block" style={{ transform: "rotate(130deg)" }}>&#9999;</span>
								</button>

								<button onClick={handleDelete} className="border border-gray-600!">
									Delete Product
								</button>

							</div>)}
						{(isAdmin && editMode) ? (
							<div>
								<form className="min-w-xl" onSubmit={handleFormSubmit}>
									<div className="flex flex-col mt-2 px-2 w-full">
										<label htmlFor="">Product Name</label>
										<input type="text"
											value={formData.name}
											onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
											className="border border-gray-700 rounded-md w-full px-2 py-2 active:border-gray-600 focus:border-gray-500" />
									</div>

									<div className="flex flex-col mt-2 px-2 ">
										<label htmlFor="">Product Price ₹</label>
										<input type="number"
											value={formData.price}
											onChange={(e) => setFormData((prev) => ({ ...prev, price: Number(e.target.value) }))}
											className="border border-gray-700 rounded-md w-20 px-2 py-2 active:border-gray-600 focus:border-gray-500" />
									</div>

									<div className="flex flex-col mt-2 px-2 w-full">
										<label htmlFor="">Product Category</label>
										<select name="category" className="border border-gray-700 rounded-md w-full px-2 py-2 active:border-gray-600 focus:border-gray-500"
											defaultValue={formData.category}
											onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}>

											{availableCategories.map((category) => (
												<option className="bg-gray-700" key={category} value={category}>{category}</option>
											))}
										</select>
									</div>
									<div className="flex flex-col mt-2 px-2 w-full">
										<label htmlFor="">Product description</label>
										<textarea value={formData.description} onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
											className="border border-gray-700 rounded-md w-full px-2 py-2 active:border-gray-600 focus:border-gray-500" >
											{formData.description}
										</textarea>
									</div>


									{erros && <>
										<div className="flex flex-col mt-8 px-2 w-full">
											<p className="text-red-400">
												{erros}
											</p>
										</div>
									</>}

									<div className="flex flex-col mt-8 px-2 w-full">

										<button disabled={isEditing} type="submit" className="border border-gray-700 rounded-md w-full px-2 py-2 active:border-gray-600 focus:border-gray-500" >
											{isEditing ? "Editing" : "Save product"}
										</button>
									</div>
								</form>
							</div>
						) : (<div key={product._id}
							className="border min-w-3xl text-gray-300! border-gray-700 rounded-md px-4 py-2 min-h-20 mx-4 my-2 space-y-3">
							<div>
								<p>Id: {product._id}</p>
							</div>
							<div>
								<p>Name: {product.name}</p>
							</div>
							<div>
								<p>Price: {product.price} ₹</p>
							</div>
							<div>
								<p>{product.description}</p>
							</div>
							<div>
								<p>Added on: {new Date(product.createdAt).toDateString()}</p>
							</div>
							<div>
								<span className="border border-gray-600 rounded-full px-3 py-1">{product.category}</span>
							</div>
						</div>)}
					</div>
				) : (
					<div>
						<p>product not found</p>
					</div>
				)}
			</div>
		</div>
	)
}
export default Product