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

import { NavLink as RRNavLink } from "react-router-dom";

const isAuthenticated = false;

const Header = props => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <Navbar light expand="md">
            <Container>
                <NavbarBrand to="/" tag={RRNavLink}>
                    Your Blog
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink to="/" tag={RRNavLink} exact>
                                Home
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/blog" tag={RRNavLink}>
                                Blog
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/about" tag={RRNavLink}>
                                About
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/contact" tag={RRNavLink}>
                                Contact
                            </NavLink>
                        </NavItem>
                        {isAuthenticated && (
                            <NavItem>
                                <NavLink to="/posts" exact tag={RRNavLink}>
                                    Post
                                </NavLink>
                            </NavItem>
                        )}
                        <NavItem>
                            <NavLink to="/login" exact tag={RRNavLink}>
                                Login
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
