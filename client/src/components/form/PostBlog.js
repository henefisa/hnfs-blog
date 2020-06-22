import React, { useState, useEffect } from "react";
import { Form, Input, Alert, Container } from "reactstrap";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import Field from "../common/Field";

const fields = [
    { type: "text", name: "title", title: "Title" },
    { type: "text", name: "description", title: "Description" }
];
const PostBlog = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [editorState, setEditorState] = React.useState(
        EditorState.createEmpty()
    );
    const [initialValues, setInitialValues] = useState({
        title: "",
        description: ""
    });
    const { postId } = useParams();
    useEffect(() => {
        async function fetchPosts() {
            const result = await (
                await fetch(`/authentication/posts/` + postId, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            ).json();
            if (result.ok) {
                setInitialValues({
                    title: result.data.title,
                    description: result.data.description
                });
                const blocksFromHtml = htmlToDraft(result.data.content);
                const { contentBlocks, entityMap } = blocksFromHtml;
                const contentState = ContentState.createFromBlockArray(
                    contentBlocks,
                    entityMap
                );
                const editorState = EditorState.createWithContent(contentState);
                setEditorState(editorState);
            }
        }
        if (postId) {
            fetchPosts();
        }
    }, [postId]);
    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            title: Yup.string().required("Title is required"),
            description: Yup.string()
                .min(10, "Description must be 10 characters or more")
                .required("Description is required")
        }),
        onSubmit: async values => {
            const content = editorState.getCurrentContent();
            const data = draftToHtml(convertToRaw(content));
            const result = await (
                await fetch("/authentication/posts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ ...values, content: data })
                })
            ).json();
            if (result.ok) {
                setIsSuccess(true);
            } else {
                setIsError(true);
            }
        },
        enableReinitialize: true
    });

    return (
        <Container>
            <Form onSubmit={formik.handleSubmit}>
                {isSuccess && <Alert color="success">Success</Alert>}
                {isError && <Alert color="danger">Failed</Alert>}
                {fields.map((field, fieldIndex) => (
                    <Field
                        key={fieldIndex}
                        type={field.type}
                        name={field.name}
                        title={field.title}
                        formik={formik}
                    />
                ))}
                <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={setEditorState}
                />
                <Input type="submit" value="Post" />
            </Form>
        </Container>
    );
};

export default PostBlog;
