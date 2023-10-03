import { useState } from "react";
import axios from "../utils/axios.js";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth.js";

export default function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMesage] = useState("");
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();

    const tryLogUser = async (e) => {
        e.preventDefault();

        setErrorMesage("");

        try {
            const response = await axios.post("/user/login", { login, password }, { headers: { "Content-Type": "application/json" } });
            localStorage.setItem("ACCESS_TOKEN", response.data.accessToken);
            setAuth({ isLogged: true, accessToken: response.data.accessToken });
            navigate("/");
        } catch (error) {
            setErrorMesage(error?.response?.data?.errorMessage || "");
        }
    };

    return (
        auth.isLogged == true ? <Navigate to="/" /> :
            (<>
                <h1>Sign In</h1>
                <h3>{errorMessage}</h3>
                <form onSubmit={tryLogUser}>
                    <input type="text" placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)} />
                    <input type="password" placeholder="Password" autoSave="false" autoComplete="false" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button>Sign In</button>
                </form>
                <Link to="/register">Need an account?</Link>
            </>)
    );
}