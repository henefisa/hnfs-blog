import React, { Component } from "react";
import axios from "axios";
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback
} from "reactstrap";

class PostBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: {
        value: "",
        isValid: undefined,
        errorMessage: "Please enter post title!\n"
      },
      description: {
        value: "",
        isValid: undefined,
        errorMessage: "Description must have more than 10 words!\n"
      },
      content: {
        value: "",
        isValid: undefined,
        errorMessage: "Please enter post content!\n"
      }
    };
  }

  handleOnChange = event => {
    const { name, value } = event.target;
    this.setState(
      prevState => ({
        ...prevState,
        [name]: {
          ...prevState[name],
          value
        }
      }),
      () => {
        let errorMessage = "";
        let isValid = true;
        if (value === "") {
          if (name === "title") {
            errorMessage = "Please enter post title!\n";
            isValid = false;
          }
          if (name === "description") {
            errorMessage = "Please enter post description!\n";
            isValid = false;
          }
          if (name === "content") {
            errorMessage = "Please enter post content!\n";
            isValid = false;
          }
        } else {
          if (name === "description" && value.length < 10) {
            errorMessage = "Description must have more than 10 words!\n";
            isValid = false;
          }
        }

        this.setState(prevState => ({
          ...prevState,
          [name]: {
            ...prevState[name],
            errorMessage,
            isValid
          }
        }));
      }
    );
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title, description, content } = this.state;
    const data = {
      title: title.value,
      description: description.value,
      content: content.value
    };
    axios.post("/api/posts", data);
    window.location.href = '/posts';
  };

  handleClick = event => {
    const check = Object.entries(this.state).reduce((update, [key, value]) => {
      if (value.errorMessage !== "") {
        update[key] = {
          ...value,
          isValid: false
        };
      }
      return update;
    }, {});
    if (Object.keys(check).length > 0) {
      this.setState(check);
      event.preventDefault();
    }
  };

  render() {
    return (
      <div className="post-blog">
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              id="title"
              name="title"
              invalid={
                !(
                  this.state.title.isValid === true ||
                  this.state.title.isValid === undefined
                )
              }
              value={this.state.title.value}
              onChange={this.handleOnChange}
            />
            <FormFeedback invalid>{this.state.title.errorMessage}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              id="description"
              name="description"
              invalid={
                !(
                  this.state.description.isValid === true ||
                  this.state.description.isValid === undefined
                )
              }
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
              invalid={
                !(
                  this.state.content.isValid === true ||
                  this.state.content.isValid === undefined
                )
              }
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
export default PostBlog;
