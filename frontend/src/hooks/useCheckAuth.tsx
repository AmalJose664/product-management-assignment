import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { axiosInstance } from "../utils/axios"
import { useApp } from "../context/AppContext"

const useCheckAuth = () => {
	const navigate = useNavigate()
	const { user } = useApp()
	useEffect(() => {
		const token = localStorage.getItem("access_token")
		if (user && token) navigate("/")
		// async function verify() {
		// 	try {
		// 		const response = await axiosInstance.get("/auth/me")

		// 		navigate("/")
		// 	} catch (error) {
		// 	}
		// }
		// verify()
	}, [user])
}

export default useCheckAuth