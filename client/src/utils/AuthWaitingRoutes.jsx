import { Outlet } from "react-router-dom";
import { useAuth } from "./useAuth.js";

export default function AuthWaitingRoutes() {
    const { auth } = useAuth();

    return (
        auth.isLogged === null ? "Loading..." : <Outlet />
    );
}