import React, { useState } from "react";
import { Form, Input, Alert } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

import Field from "../common/Field";

const fields = [
    { type: "text", name: "username", title: "Username" },
    { type: "text", name: "email", title: "Email" },
    { type: "password", name: "password", title: "Password" }
];

const RegisterForm = props => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(5, "Username must be 5 characters or more")
                .required("Username is required"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string()
                .min(6, "Password must be 6 characters or more")
                .required("Password is required")
        }),
        onSubmit: async values => {
            const result = await (
                await fetch("/authentication/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(values)
                })
            ).json();
            if (result.ok) {
                setIsSuccess(true);
                setErrorMessage("");
            } else {
                setErrorMessage(result.errorMessage);
            }
        }
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
            {isSuccess && <Alert color="success">Success!</Alert>}
            {fields.map((field, fieldIndex) => (
                <Field
                    key={fieldIndex}
                    name={field.name}
                    type={field.type}
                    title={field.title}
                    formik={formik}
                />
            ))}
            <Input type="submit" value="Register" />
        </Form>
    );
};

export default RegisterForm;
