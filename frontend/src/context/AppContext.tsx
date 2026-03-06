import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "../types/User"
import type { Product } from "../types/Product"
import { axiosInstance } from "../utils/axios"

type AppContextType = {
	user: User | null
	setUser: (user: User | null) => void
	products: Product[],
	loading: boolean
	selectedProduct: Product | null
	setProducts: (products: Product[]) => void
	setSelectedProduct: (p: Product | null) => void
}


const AppContext = createContext<AppContextType | null>(null)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [products, setProducts] = useState<Product[]>([])
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)


	useEffect(() => {
		const verify = async () => {
			const token = localStorage.getItem("access_token")
			if (!token) {
				console.log("made fale from token")
				setIsLoading(false)
				return
			}
			try {
				const response = await axiosInstance.get("/auth/me")
				setUser(response.data.user)
			} catch {
				localStorage.removeItem("access_token")
				localStorage.removeItem("refresh_token")
			} finally {
				setIsLoading(false)
			}
		}
		verify()
	}, [])
	return (
		<AppContext.Provider value={{
			user,
			setUser,
			products,
			setProducts,
			selectedProduct,
			setSelectedProduct,

			loading: isLoading
		}} >
			{children}
		</AppContext.Provider>
	)
}

export const useApp = () => {
	const context = useContext(AppContext)
	if (!context) throw new Error("useApp must be used inside AppProvider")
	return context
}