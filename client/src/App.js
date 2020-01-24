import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Routes from "./route/Routes";

import { AuthContext } from "./context/AuthContext";

const App = () => {
    const [user, setUser] = useState({});
    const logoutCallback = async () => {
        await fetch("/authentication/logout", {
            method: "POST",
            credentials: "include"
        });
        setUser({});
    };

    useEffect(() => {
        async function checkRefreshToken() {
            const fetchData = await fetch("/authentication/refresh_token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const result = await fetchData.json();
            setUser({
                accessToken: result.accessToken,
                username: result.username
            });
        }
        checkRefreshToken();
    }, []);
    return (
        <div className="App">
            <AuthContext.Provider value={[user, setUser]}>
                <Header logoutCallback={logoutCallback} />
                <Routes />
                <Footer />
            </AuthContext.Provider>
        </div>
    );
};

export default App;
