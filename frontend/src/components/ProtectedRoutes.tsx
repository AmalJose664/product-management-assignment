import { Navigate, Outlet } from "react-router-dom";

import React from "react";
import { useApp } from "../context/AppContext";
import Loading from "../pages/Loading";

const UserProtectedRoute: React.FC = () => {
	const { user, loading } = useApp()
	if (loading) {
		return <Loading />
	}
	return user ? <Outlet /> : <Navigate to='/login' replace />
}

export default UserProtectedRoute