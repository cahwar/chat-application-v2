import { useState } from "react";
import axios from "../utils/axios.js";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth.js";

export default function Register() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMesage] = useState("");
    const { auth } = useAuth();
    const navigate = useNavigate();

    const tryLogUser = async (e) => {
        e.preventDefault();

        setErrorMesage("");

        try {
            const response = await axios.post("/user/register", { login, password }, { headers: { "Content-Type": "application/json" } });
            if (response.status === 200) {
                navigate("/login");
            }
        } catch (error) {
            setErrorMesage(error?.response?.data?.errorMessage || "");
        }
    };

    return (
        auth.isLogged == true ? <Navigate to="/" /> :
            (<>
                <h1>Sign Up</h1>
                <h3>{errorMessage}</h3>
                <form onSubmit={tryLogUser}>
                    <input type="text" placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)} />
                    <input type="password" placeholder="Password" autoSave="false" autoComplete="false" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button>Sign Up</button>
                </form>
                <Link to="/login">Already have an account?</Link>
            </>)
    );
}