import React from "react";
import { Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NotFoundPage from "../components/pages/NotFoundPage";

const PrivateRoute = ({ component: Comp, ...rest }) => {
    const [user] = useAuth();
    return (
        <Route
            {...rest}
            render={(props) => (user.accessToken ? <Comp {...props}/> : <NotFoundPage />)}
        />
    );
};
export default PrivateRoute;
