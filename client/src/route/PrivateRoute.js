import React from "react";
import { Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NotFoundPage from "../components/pages/NotFoundPage";

const PrivateRoute = ({ children, ...rest }) => {
    const [user] = useAuth();

    return (
        <Route
            {...rest}
            render={() => (user.accessToken ? children : <NotFoundPage />)}
        />
    );
};
export default PrivateRoute;
