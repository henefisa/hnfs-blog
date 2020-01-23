import React from "react";
import { FormGroup, Label, Input, FormFeedback } from "reactstrap";

const Field = ({ type, name, title, formik }) => {
    return (
        <FormGroup>
            <Label for={name}>{title}</Label>
            <Input
                name={name}
                {...formik.getFieldProps(name)}
                invalid={!!formik.touched[name] && !!formik.errors[name]}
                type={type}
            />
            <FormFeedback invalid>{formik.errors[name]}</FormFeedback>
        </FormGroup>
    );
};

export default Field;
