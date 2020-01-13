import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Routes from "./route/Routes";
import "./App.css";

import { AuthContext } from "./context/AuthContext";

const App = () => {
    const history = useHistory();
    const [user, setUser] = useState({});
    const logoutCallback = async () => {
        await fetch("/authentication/logout", {
            method: "POST",
            credentials: "include"
        });
        setUser({});
        history.push('/');
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
                accessToken: result.accessToken
            });
        }
        checkRefreshToken();
    }, []);
    return (
        <div className="App">
            <AuthContext.Provider value={[user, setUser]}>
                <Header />
                <Routes />
                <Footer />
                <button onClick={logoutCallback}>Logout</button>
            </AuthContext.Provider>
        </div>
    );
};

export default App;
