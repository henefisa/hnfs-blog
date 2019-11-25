import React, { Component } from "react";

import { Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";

const REGEX_CHECK_EMAIL = /\S+@[a-zA-Z0-9]{2,}\.\S{2,4}$/;
const REGEX_CHECK_PHONENUMBER = /^\d{10,11}$/;

class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: {
        value: "",
        isValid: undefined,
        errorMessage: "Please enter your name!\n"
      },
      phoneNumber: {
        value: "",
        isValid: true,
        errorMessage: ""
      },
      email: {
        value: "",
        isValid: undefined,
        errorMessage: "Please enter your email!\n"
      },
      message: {
        value: "",
        isValid: undefined,
        errorMessage: "Please enter your message!\n"
      }
    };
  }

  handleOnChange = event => {
    const { value, name } = event.target;
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
          if (name === "fullName") {
            errorMessage = "Please enter your name!\n";
            isValid = false;
          }
          if (name === "email") {
            errorMessage = "Please enter your email!\n";
            isValid = false;
          }
          if (name === "message") {
            errorMessage = "Please enter your message!\n";
            isValid = false;
          }
        } else {
          const { value } = this.state[name];
          if (name === "phoneNumber" && !REGEX_CHECK_PHONENUMBER.test(value)) {
            errorMessage = "Phone number must have 10 or 11 numbers!\n";
            isValid = false;
          }
          if (name === "email" && !REGEX_CHECK_EMAIL.test(value)) {
            errorMessage = "Invalid email address!\n";
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
    let alertMessage = "";

    for (const message of Object.values(this.state)) {
      if (message.errorMessage !== "") {
        alertMessage += message.errorMessage;
      }
    }
    if (alertMessage !== "") {
      alert(alertMessage);
      event.preventDefault();
    }
  };
  render() {
    return (
      <div className="Contact">
        <Form onSubmit={this.handleSubmit} method="POST" action="/api/contact">
          <FormGroup>
            <Label for="fullName">
              Full Name <span className="red">*</span>
            </Label>
            <Input
              id="fullName"
              name="fullName"
              invalid={
                !(
                  this.state.fullName.isValid === true ||
                  this.state.fullName.isValid === undefined
                )
              }
              value={this.state.fullName.value}
              onChange={this.handleOnChange}
            />
            <FormFeedback invalid>
              {this.state.fullName.errorMessage}
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              invalid={!(this.state.phoneNumber.isValid === true)}
              onChange={this.handleOnChange}
              value={this.state.phoneNumber.value}
            />
            <FormFeedback invalid>
              {this.state.phoneNumber.errorMessage}
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="email">
              Email <span className="red">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              invalid={
                !(
                  this.state.email.isValid === true ||
                  this.state.email.isValid === undefined
                )
              }
              onChange={this.handleOnChange}
              value={this.state.email.value}
            />
            <FormFeedback invalid>{this.state.email.errorMessage}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="message">
              Message <span className="red">*</span>
            </Label>
            <Input
              id="message"
              name="message"
              type="textarea"
              invalid={
                !(
                  this.state.message.isValid === true ||
                  this.state.message.isValid === undefined
                )
              }
              onChange={this.handleOnChange}
              value={this.state.message.value}
            />
            <FormFeedback invalid>
              {this.state.message.errorMessage}
            </FormFeedback>
          </FormGroup>
          <Input type="submit" value="Submit" />
        </Form>
      </div>
    );
  }
}
export default Contact;
