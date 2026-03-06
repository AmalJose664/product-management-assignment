import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { axiosInstance } from "../utils/axios"
import { useApp } from "../context/AppContext"
import useCheckAuth from "../hooks/useCheckAuth"


function Login() {
	const [formData, setFormData] = useState({ email: "", password: "" })
	const [erros, setErrors] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()
	const { setUser, } = useApp()
	useCheckAuth()

	const submitForm = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()
		setErrors("");
		const { email, password } = formData
		if (!email || !password) {
			setErrors("All fields are required");
			return false;
		}
		return await login()
	}
	const login = async () => {
		try {
			setIsLoading(true)
			const response = await axiosInstance.post("/auth/login", formData)
			const data = response.data
			const token = data.tokens
			localStorage.setItem("access_token", token.accessToken)
			localStorage.setItem("refresh_token", token.refreshToken)
			setUser(data.user)
			navigate("/")
		} catch (error: any) {
			// console.log(error.response.data.message)
			setErrors(error.response.data.message || "Error during login")
		} finally {
			setIsLoading(false)
		}
	}
	return (
		<div className="flex items-center mt-20 justify-center flex-col">
			<h3 className="text-2xl font-semibold ">Login</h3>
			<div>
				<div className="mt-4">
					<form action="" className="min-w-sm" onSubmit={submitForm}>
						<div className="flex flex-col mt-2 px-2 w-full">
							<label htmlFor="">Email</label>
							<input type="text"
								onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
								className="border border-gray-700 rounded-md w-full px-2 py-2 active:border-gray-600 focus:border-gray-500" />
						</div>
						<div className="flex flex-col mt-2 px-2 w-full">
							<label htmlFor="">Password</label>
							<input type="password"
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
								{isLoading ? "Loading" : "Log In"}
							</button>
							<Link to={"/signup"} className="text-xs mt-4">signup</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Login