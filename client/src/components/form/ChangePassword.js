import React, { useState } from "react";
import { Form, Input, Alert } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import Field from "../common/Field";
import { useAuth } from "../../context/AuthContext";

const fields = [
    { type: "password", name: "oldPassword", title: "Old Password" },
    { type: "password", name: "newPassword", title: "New Password" },
    {
        type: "password",
        name: "confirmNewPassword",
        title: "Confirm New Password"
    }
];

export default props => {
    const [user] = useAuth();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: ""
        },
        validationSchema: Yup.object({
            oldPassword: Yup.string().required("Old password is required"),
            newPassword: Yup.string().required("New Password is required")
        }),
        validate: values => {
            const errors = {};
            if (values.oldPassword && values.newPassword === values.oldPassword)
                errors.newPassword = "Old and new password can not be the same";
            if (values.newPassword !== values.confirmNewPassword)
                errors.confirmNewPassword =
                    "Confirm password must match new password";
            return errors;
        },
        onSubmit: async values => {
            const result = await (
                await fetch("/authentication/change_password", {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                        authorization: `Bearer ${user.accessToken}`
                    },
                    body: JSON.stringify(values)
                })
            ).json();
            if (result.ok) {
                setIsSuccess(true);
                setIsError(false);
            } else {
                setIsError(result.errorMessage);
            }
        }
    });
    return (
        <Form onSubmit={formik.handleSubmit}>
            {isSuccess && <Alert color="success">Password changed</Alert>}
            {isError && <Alert color="danger">{isError}</Alert>}
            {fields.map((field, fieldIndex) => (
                <Field
                    key={fieldIndex}
                    name={field.name}
                    type={field.type}
                    title={field.title}
                    formik={formik}
                />
            ))}
            <Input type="submit" value="Done" />
        </Form>
    );
};
