import React, { useState } from "react";
import { Form, Input, Alert } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

import Field from "../common/Field";

const fields = {
    sections: [
        [
            { type: "text", name: "title", title: "Title" },
            { type: "text", name: "description", title: "Description" }
        ],
        [{ type: "textarea", name: "content", title: "Content" }]
    ]
};

const PostBlog = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            content: ""
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Title is required"),
            description: Yup.string()
                .min(10, "Description must be 10 characters or more")
                .required("Description is required"),
            content: Yup.string().required("Content is required")
        }),
        onSubmit: async values => {
            const result = await (
                await fetch("/authentication/posts", {
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
            {isSuccess && <Alert color="success">Success</Alert>}
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
                )))}
            <Input type="submit" value="Post" />
        </Form>
    );
};

export default PostBlog;
