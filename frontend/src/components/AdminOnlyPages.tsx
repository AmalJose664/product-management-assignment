import { Navigate, Outlet } from "react-router-dom";

import React from "react";
import { useApp } from "../context/AppContext";
import Loading from "../pages/Loading";


const AdminOnlyRoute: React.FC = () => {
	const { user, loading } = useApp()
	if (loading) {
		return <Loading />
	}
	if (!user) <Navigate to='/login' replace />
	const isAdmin = user?.role === "ADMIN"
	return isAdmin ? <Outlet /> : <Navigate to='/' replace />
}

export default AdminOnlyRoute