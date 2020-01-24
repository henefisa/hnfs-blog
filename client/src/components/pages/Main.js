import React from "react";

import { Container, Button } from "reactstrap";
import { Link } from "react-router-dom";

import "../../styles/Main.scss";

const Main = props => {
    return (
        <div className="Main">
            <div className="landing--image">
                <Container className="text-center">
                    <div className="landing--text">
                        <h1 className="w-100">
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit.
                        </h1>
                        <div className="group--link-btn">
                            <Button to="/about" tag={Link}>
                                About
                            </Button>
                            <Button to="/blog" tag={Link}>
                                Blog
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Main;
