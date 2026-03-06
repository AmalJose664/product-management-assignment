import { useState } from "react";
import type { Product, ProductAddType } from "../types/Product";
import { useNavigate } from "react-router-dom";
import { availableCategories } from "../constants/product";
import { axiosInstance } from "../utils/axios";

const AddProduct = () => {
	const [formData, setFormData] = useState<ProductAddType>({ name: "", category: "", description: "", price: 0 })
	const [erros, setErrors] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	const navigate = useNavigate()

	const handleFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { name, category, description, price } = formData
		if (!name || !category || !description || !price) {
			setErrors("Please fill all fields")
			return
		}
		return await addProduct()

	}

	const addProduct = async () => {
		try {
			setIsLoading(true)
			const response = await axiosInstance.post("/product", formData)
			const productAdded = response.data.product as Product
			navigate("/products/" + productAdded._id)

		} catch (error: any) {
			// console.log(error.response.data.message)
			setErrors(error.response.data.message || "Error during adding product")
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="flex items-center mt-20 justify-center flex-col">
			<h3 className="text-2xl font-semibold ">Product Page</h3>
			<p className="text-xl">Admin only</p>
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
						<label htmlFor="">Product Price</label>
						<input type="number"
							value={formData.price}
							onChange={(e) => setFormData((prev) => ({ ...prev, price: Number(e.target.value) }))}
							className="border border-gray-700 rounded-md w-20 px-2 py-2 active:border-gray-600 focus:border-gray-500" />
					</div>
					<div className="flex flex-col mt-2 px-2 w-full">
						<label htmlFor="">Product Category</label>
						<select name="category" className="border border-gray-700 rounded-md w-full px-2 py-2 active:border-gray-600 focus:border-gray-500"
							onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}>

							{availableCategories.map((category) => (
								<option className="bg-gray-700" key={category} value={category}>{category}</option>
							))}
						</select>
					</div>
					<div className="flex flex-col mt-2 px-2 w-full">
						<label htmlFor="">Product description</label>
						<textarea onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
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

						<button disabled={isLoading} type="submit" className="border border-gray-700 rounded-md w-full px-2 py-2 active:border-gray-600 focus:border-gray-500" >
							{isLoading ? "Adding" : "Add product"}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default AddProduct