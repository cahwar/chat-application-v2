import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth.js";

export default function PrivateRoutes() {
    const { auth } = useAuth();
    return (
        auth.isLogged === true ? <Outlet /> : <Navigate to="/login" />
    );
}