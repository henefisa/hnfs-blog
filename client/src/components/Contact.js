import React, { Component } from "react";
import axios from "axios";
import { Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";

const REGEX_CHECK_EMAIL = /\S+@[a-zA-Z0-9]{2,}\.\S{2,4}$/;
const REGEX_CHECK_PHONENUMBER = /^\d{10,11}$/;

const errorObj = {
    empty: {
        fullName: "Please enter your name!\n",
        email: "Please enter your email!",
        message: "Please enter your message!"
    },
    nonEmpty: {
        phoneNumber: "Phone number must have 10 or 11 numbers!",
        email: "Invalid email address!"
    }
};

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: {
                value: "",
                errorMessage: ""
            },
            phoneNumber: {
                value: "",
                errorMessage: ""
            },
            email: {
                value: "",
                errorMessage: ""
            },
            message: {
                value: "",
                errorMessage: ""
            }
        };
    }

    checkValue = (name, value) => {
        let errorMessage = "";
        if (!value) {
            errorMessage = errorObj["empty"][name] || "";
        } else {
            if (errorObj["nonEmpty"].hasOwnProperty(name)) {
                switch(name){
                    case "phoneNumber": {
                        errorMessage = REGEX_CHECK_PHONENUMBER.test(value) ? "" : errorObj['nonEmpty'][name];
                        break;
                    }
                    case "email": {
                        errorMessage = REGEX_CHECK_EMAIL.test(value) ? "" : errorObj['nonEmpty'][name];
                        break;
                    }
                    default: break;
                };
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

    handleSubmit = async event => {
        console.log(event);
        event.preventDefault();
        const { fullName, phoneNumber, email, message } = this.state;
        const data = {
            fullName: fullName.value,
            phoneNumber: phoneNumber.value,
            email: email.value,
            message: message.value
        };
        axios.post("/api/contact", data);
        //window.location.href = "/contact";
    };

    handleClick = async event => {
        let valid = true;
        const check = Object.entries(this.state).reduce((update, [k, v]) => {
            //[k,v] === [key, value]
            const errorMessage = this.checkValue(k, v.value);
            update[k] = {
                ...v,
                errorMessage
            };
            if (valid && errorMessage !== "") {
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
        const { fullName, phoneNumber, email, message } = this.state;
        return (
            <div className="Contact">
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="fullName">
                            Full Name <span className="red"> * </span>
                        </Label>
                        <Input
                            id="fullName"
                            name="fullName"
                            invalid={fullName.errorMessage !== ""}
                            value={this.state.fullName.value}
                            onChange={this.handleOnChange}
                        />
                        <FormFeedback invalid>
                            {this.state.fullName.errorMessage}
                        </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="phoneNumber"> Phone Number </Label>
                        <Input
                            id="phoneNumber"
                            name="phoneNumber"
                            invalid={phoneNumber.errorMessage !== ""}
                            onChange={this.handleOnChange}
                            value={this.state.phoneNumber.value}
                        />
                        <FormFeedback invalid>
                            {this.state.phoneNumber.errorMessage}
                        </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">
                            Email <span className="red"> * </span>
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            invalid={email.errorMessage !== ""}
                            onChange={this.handleOnChange}
                            value={this.state.email.value}
                        />
                        <FormFeedback invalid>
                            {this.state.email.errorMessage}
                        </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="message">
                            Message <span className="red"> * </span>
                        </Label>
                        <Input
                            id="message"
                            name="message"
                            type="textarea"
                            invalid={message.errorMessage !== ""}
                            onChange={this.handleOnChange}
                            value={this.state.message.value}
                        />
                        <FormFeedback invalid>
                            {this.state.message.errorMessage}
                        </FormFeedback>
                    </FormGroup>
                    <Input
                        type="submit"
                        value="Submit"
                        onClick={this.handleClick}
                    />
                </Form>
            </div>
        );
    }
}
export default Contact;
