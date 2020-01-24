import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Input, Alert } from "reactstrap";

import { useAuth } from "../../context/AuthContext";
import Field from "../common/Field";

const fields = [
    { type: "text", name: "username", title: "Username" },
    { type: "password", name: "password", title: "Password" }
];

export default props => {
    const [, setUser] = useAuth();
    const [isError, setIsError] = useState(false);

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Username is required"),
            password: Yup.string().required("Password is required")
        }),
        onSubmit: async values => {
            const fetchData = await fetch("/authentication/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            });
            const result = await fetchData.json();
            if (result.accessToken) {
                if (props.toggle) props.toggle();
                setTimeout(() => {
                    setUser({
                        accessToken: result.accessToken,
                        username: result.username
                    });
                }, 500);
            } else {
                setIsError(true);
            }
        }
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            {isError && (
                <Alert color="danger">Wrong username or password</Alert>
            )}
            {fields.map((field, fieldIndex) => (
                <Field
                    key={fieldIndex}
                    name={field.name}
                    type={field.type}
                    title={field.title}
                    formik={formik}
                />
            ))}
            <Input type="submit" value="Submit" />
        </Form>
    );
};
