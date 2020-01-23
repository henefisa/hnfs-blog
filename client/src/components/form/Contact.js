import React, { useState } from "react";
import { Form, Input, Alert } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

import Field from '../common/Field';

const REGEX_CHECK_PHONENUMBER = /^\d{10,11}$/;

const fields = {
    sections: [
        [
            { type: "text", name: "fullName", title: "Full Name" },
            { type: "text", name: "phoneNumber", title: "Phone Number" },
            { type: "text", name: "email", title: "Email" }
        ],
        [{ type: "textarea", name: "message", title: "Message" }]
    ]
};

const Contact = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const formik = useFormik({
        initialValues: {
            fullName: "",
            phoneNumber: "",
            email: "",
            message: ""
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required("Full name is required"),
            phoneNumber: Yup.string().matches(REGEX_CHECK_PHONENUMBER, {
                message: "Invalid phonenumber"
            }),
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            message: Yup.string()
                .min(20, "Message must be 20 characters or more")
                .required("Message is required")
        }),
        onSubmit: async values => {
            const result = await (
                await fetch("/authentication/contact", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(values)
                })
            ).json();
            if (result.ok) {
                setIsSuccess(true);
            } else {
                setIsError(true);
            }
        }
    });
    return (
        <Form onSubmit={formik.handleSubmit}>
            {isSuccess && <Alert color="success">Sent</Alert>}
            {isError && <Alert color="danger">Failed</Alert>}
            {fields.sections.map(section =>
                section.map((field, fieldIndex) => (
                    <Field
                        key={fieldIndex}
                        type={field.type}
                        name={field.name}
                        title={field.title}
                        formik={formik}
                    />
                ))
            )}
            <Input type="submit" value="Send" />
        </Form>
    );
};

export default Contact;
