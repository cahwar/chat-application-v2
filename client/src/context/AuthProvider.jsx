import { createContext, useEffect, useState } from "react";
import axios from "../utils/axios.js";

export const AuthContext = createContext({ isLogged: null });

export default function AuthProvider({ children }) {
    const [auth, setAuth] = useState({ isLogged: null });

    useEffect(() => {
        let isMounted = true;

        const checkAccessToken = async (accessToken) => {
            const abortController = new AbortController();
            const response = await axios.get("/user/access", {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                },
                signal: abortController.signal,
            });

            if (!isMounted) {
                return;
            }

            if (response.data.isLogged === true) {
                setAuth({ isLogged: true, accessToken: accessToken });
            } else {
                localStorage.removeItem("ACCESS_TOKEN");
                setAuth({ isLogged: false });
            }
        };

        const accessToken = localStorage.getItem("ACCESS_TOKEN");
        if (accessToken) {
            checkAccessToken(accessToken);
        } else {
            setAuth({ isLogged: false });
        }

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}