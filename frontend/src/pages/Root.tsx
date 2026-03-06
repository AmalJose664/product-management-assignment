import { Link } from "react-router-dom"
import { useApp } from "../context/AppContext"

const Root = () => {
	const { user } = useApp()
	const pages = ["/login", "/signup", "/user", "/products"]
	return (
		<div className="flex mt-40 items-center justify-center flex-col">
			<div className="">
				<h3 className="text-2xl font-semibold ">Available Pages</h3>
			</div>

			<div>
				{pages.map((p, i) => (
					<div className="mt-4" key={i}>
						<Link to={p}>{p}</Link>
					</div>
				))}

			</div>

			{user && <>
				<div>
					user: {user?.name}
				</div>
			</>}
		</div>
	)
}
export default Root