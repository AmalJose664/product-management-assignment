import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import BackButton from "./BackButton";
import AdminOnlyRoute from "./AdminOnlyPages";


const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const Notfound = lazy(() => import("../pages/NotFound"));

const Root = lazy(() => import("../pages/Root"));
const Loading = lazy(() => import("../pages/Loading"));

const User = lazy(() => import("../pages/User"));
const Product = lazy(() => import("../pages/SingleProduct"));
const Products = lazy(() => import("../pages/Products"));

const AddProduct = lazy(() => import("../pages/AddProduct"));

const ProtectedRoute = lazy(() => import("../components/ProtectedRoutes"));


function AppRoute() {
	return (
		<Suspense fallback={<Loading />}>
			<div className="w-full h-screen overflow-x-hidden">
				<BackButton />
				<Routes>
					<Route path="/" element={<Root />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />

					<Route element={<ProtectedRoute />}>
						<Route path="/user" element={<User />} />
						<Route path="/products" element={<Products />} />
						<Route path="/products/:id" element={<Product />} />
					</Route>

					<Route element={<AdminOnlyRoute />}>
						<Route path="/products/add" element={<AddProduct />} />
					</Route>
					<Route path="*" element={<Notfound />} />
				</Routes>
			</div>
		</Suspense>
	);
}

export default AppRoute;