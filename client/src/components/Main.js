import React from "react";

import { Container, Button } from "reactstrap";

import "../styles/Main.css";

const Main = props => {
  return (
    <div className="Main">
      <div className="landing--image">
        <Container className="text-center">
          <div className="landing--text">
            <h1 className="w-100">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </h1>
            <div className="group--link-btn">
              <Button href="/about" color="primary">About</Button>
              <Button outline href="/blog" color="secondary">Blog</Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Main;
