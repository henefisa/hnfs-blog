import React, { useState } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import withModals from "../HOCs/withModals";
import Login from "../components/form/Login";
import RegisterForm from "../components/form/RegisterForm";

const LoginModal = withModals({ title: "Login"})(Login);
const RegisterModal = withModals({ title: "Register"})(
    RegisterForm
);

const AuthorizedHeader = ({ logoutCallback }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);
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
                        <NavItem>
                            <Dropdown
                                isOpen={dropdownOpen}
                                toggle={toggleDropdown}
                                nav
                                inNavbar
                            >
                                <DropdownToggle nav caret>Dropdown</DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>Account info</DropdownItem>
                                    <DropdownItem>Change password</DropdownItem>
                                    <DropdownItem onClick={logoutCallback}>
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
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
                            <LoginModal />
                        </NavItem>
                        <NavItem>
                            <RegisterModal />
                        </NavItem>
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    );
};

const Header = ({ logoutCallback }) => {
    const [user] = useAuth();
    return user.accessToken ? (
        <AuthorizedHeader logoutCallback={logoutCallback} />
    ) : (
        <UnauthorizedHeader />
    );
};
export default Header;
