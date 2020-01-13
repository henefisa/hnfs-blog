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

import { useAuth } from "../context/AuthContext";

const AuthorizedHeader = () => {
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
                        <NavItem>
                            <NavLink to="/posts" exact tag={RRNavLink}>
                                Post
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    );
};

const UnauthorizedHeader = props => {
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
                        <NavItem>
                            <NavLink to="/register" exact tag={RRNavLink}>
                                Login
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    );
};

const Header = () => {
    const [user] = useAuth();
    return user.accessToken ? <AuthorizedHeader /> : <UnauthorizedHeader />;
};
export default Header;
