import { useNavigate } from "react-router-dom"
import { useApp } from "../context/AppContext"

const User = () => {
	const navigate = useNavigate()
	const { user, setUser } = useApp()
	const logout = () => {
		localStorage.removeItem("access_token")
		localStorage.removeItem("refresh_token")
		setUser(null)
		navigate("/login")
	}
	return (
		<div className="flex items-center mt-20 justify-center flex-col">
			<h3 className="text-2xl font-semibold">User Page</h3>
			<div className="border border-gray-700 rounded-md min-w-sm px-6 py-4 mt-6 space-y-4">
				<div className="flex justify-between gap-10">
					<span className="text-gray-400">Name</span>
					<span className="font-medium">{user?.name}</span>
				</div>
				<div className="flex justify-between gap-10">
					<span className="text-gray-400">Email</span>
					<span className="font-medium">{user?.email}</span>
				</div>
				<div className="flex justify-between gap-10">
					<span className="text-gray-400">Role</span>
					<span className="border border-gray-600 rounded-full px-3 py-1 text-sm">{user?.role}</span>
				</div>
				<div className="flex justify-between gap-10">
					<span className="text-gray-400">Logout</span>
					<button onClick={logout}
						className="border border-gray-600 rounded-md px-3 py-1 text-sm">Logout</button>
				</div>
			</div>
		</div>
	)
}
export default User