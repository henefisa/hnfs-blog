import React, { Component } from "react";
import axios from "axios";
import { Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { withRouter } from 'react-router-dom';

class PostBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: {
                value: "",
                errorMessage: ""
            },
            description: {
                value: "",
                errorMessage: ""
            },
            content: {
                value: "",
                errorMessage: ""
            }
        };
    }

    checkValue = (name, value) => {
        let errorMessage = "";
        if (value === "") {
            if (name === "title") {
                errorMessage = "Please enter post title!\n";
            }
            if (name === "description") {
                errorMessage = "Please enter post description!\n";
            }
            if (name === "content") {
                errorMessage = "Please enter post content!\n";
            }
        } else {
            if (name === "description" && value.length < 10) {
                errorMessage =
                    "Description must have more than 10 characters!\n";
            }
        }
        return errorMessage;
    };
    handleOnChange = event => {
        const { name, value } = event.target;
        const errorMessage = this.checkValue(name, value);
        this.setState(prevState => ({
            ...prevState,
            [name]: {
                ...prevState[name],
                value,
                errorMessage
            }
        }));
    };

    handleSubmit = event => {
        event.preventDefault();
        const { history } = this.props;
        const { title, description, content } = this.state;
        const data = {
            title: title.value,
            description: description.value,
            content: content.value
        };
        axios.post("/authentication/posts", data);
        history.push('/');
    };

    handleClick = event => {
        let valid = true;
        const check = Object.entries(this.state).reduce((update, [k, v]) => {
            const errorMessage = this.checkValue(k, v.value);
            update[k] = {
                ...v,
                errorMessage
            };
            if (errorMessage !== "") {
                valid = false;
            }
            return update;
        }, {});
        if (!valid) {
            this.setState(check);
            event.preventDefault();
        }
    };

    render() {
        const {title, description, content} = this.state;
        return (
            <div className="post-blog">
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input
                            id="title"
                            name="title"
                            invalid={title.errorMessage !== ""}
                            value={this.state.title.value}
                            onChange={this.handleOnChange}
                        />
                        <FormFeedback invalid>
                            {this.state.title.errorMessage}
                        </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input
                            id="description"
                            name="description"
                            invalid={description.errorMessage !== ""}
                            value={this.state.description.value}
                            onChange={this.handleOnChange}
                        />
                        <FormFeedback invalid>
                            {this.state.description.errorMessage}
                        </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="content">Content</Label>
                        <Input
                            id="content"
                            name="content"
                            type="textarea"
                            invalid={content.errorMessage !== ""}
                            value={this.state.content.value}
                            onChange={this.handleOnChange}
                        />
                        <FormFeedback invalid>
                            {this.state.content.errorMessage}
                        </FormFeedback>
                    </FormGroup>
                    <Input
                        type="submit"
                        value="Post"
                        onClick={this.handleClick}
                    />
                </Form>
            </div>
        );
    }
}
export default withRouter(PostBlog);
