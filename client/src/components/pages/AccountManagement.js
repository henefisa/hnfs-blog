import React from "react";
import { useAuth } from "../../context/AuthContext";

import ChangePassword from "../form/ChangePassword";

const AccountManagement = props => {
    const [user] = useAuth();
    return (
        <div>
            <h3>Hello {user.username}</h3>
            <ChangePassword />
        </div>
    );
};

export default AccountManagement;
