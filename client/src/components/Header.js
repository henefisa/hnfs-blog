import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";

const Header = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
      <Navbar light expand="md" >
        <Container>
          <NavbarBrand href="/">Your Blog</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/blog/">Blog</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/about/">About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/contact/">Contact</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/posts/">Post</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
  );
};

export default Header;
