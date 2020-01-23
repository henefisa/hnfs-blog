import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const User = props => {
    const [user] = useContext(AuthContext);
    return (
        <div>
            <h3>Hello {props.username}</h3>  
        </div>
    );
};

export default User;
