import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { axiosInstance } from "../utils/axios"
import { useApp } from "../context/AppContext"
import useCheckAuth from "../hooks/useCheckAuth"


const Signup = () => {

	const [formData, setFormData] = useState({ name: "", email: "", password: "" })
	const [erros, setErrors] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const { setUser, } = useApp()
	const navigate = useNavigate()

	useCheckAuth()
	const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { email, name, password } = formData
		setErrors("");
		if (!name || !email || !password) {
			setErrors("All fields are required");
			return false;
		}

		if (/\s/.test(name) || /\s/.test(email) || /\s/.test(password)) {
			setErrors("Spaces are not allowed in any field");
			return false;
		}

		const passwordRegex = /^(?=.*[^a-zA-Z0-9]).{8,}$/;
		if (!passwordRegex.test(password)) {
			setErrors("Password must contain at least 8 characters and one special character");
			return false;
		}
		return await signup()
	}
	const signup = async () => {
		try {
			setIsLoading(true)
			const response = await axiosInstance.post("/auth/signup", formData)
			const data = response.data
			const token = data.tokens
			localStorage.setItem("access_token", token.accessToken)
			localStorage.setItem("refresh_token", token.refreshToken)
			setUser(data.user)
			navigate("/")
		} catch (error: any) {
			setErrors(error.response.data.message || "Error during sign up")
		} finally {
			setIsLoading(false)
		}
	}
	return (
		<div className="flex items-center mt-20 justify-center flex-col">
			<h3 className="text-2xl font-semibold ">Signup</h3>
			<div>
				<div className="mt-4">


					<form className="min-w-sm" onSubmit={submitForm}>


						<div className="flex flex-col mt-2 px-2 w-full">
							<label htmlFor="">Email</label>
							<input type="email"
								onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
								className="border border-gray-700 rounded-md w-full px-2 py-2 active:border-gray-600 focus:border-gray-500" />
						</div>
						<div className="flex flex-col mt-2 px-2 w-full">
							<label htmlFor="">Name</label>
							<input type="text"
								onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
								className="border border-gray-700 rounded-md w-full px-2 py-2 active:border-gray-600 focus:border-gray-500" />
						</div>
						<div className="flex flex-col mt-2 px-2 w-full">
							<label htmlFor="">Password</label>
							<input type="text"
								onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
								className="border border-gray-700 rounded-md w-full px-2 py-2 active:border-gray-600 focus:border-gray-500" />
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
								Sign Up
							</button>
							<Link to={"/login"} className="text-xs mt-4">Login</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
export default Signup