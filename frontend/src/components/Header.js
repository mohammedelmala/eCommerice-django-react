import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import SearchBox from "./SearchBox";

import { logout } from "../actions/UserActions";



const Header = () => {

    const { userInfo } = useSelector(state => state.userLogin);
    const dispatch = useDispatch();

    console.log("**** user info *******");
    console.log(userInfo);

    const logoutHandler = (e) => {
        localStorage.removeItem("userInfo");
        dispatch(logout())
        console.log("Logout");
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>

                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>ProShop</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="mr-auto" >
                            <SearchBox />
                            <LinkContainer to="/cart">
                                <Nav.Link><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                            </LinkContainer>
                            {
                                userInfo ?
                                    <NavDropdown title={userInfo.name} id={userInfo.id}>
                                        <LinkContainer to="/profile">
                                            <NavDropdown.Item>
                                                Profile
                                            </NavDropdown.Item>
                                        </LinkContainer>

                                        <NavDropdown.Item onClick={logoutHandler}>
                                            Logout
                                        </NavDropdown.Item>


                                    </NavDropdown> :
                                    <LinkContainer to="/login">
                                        <Nav.Link><i className="fas fa-user"></i>Sign In</Nav.Link>
                                    </LinkContainer>
                            }

                            {
                                userInfo && userInfo.isAdmin &&
                                (
                                    <NavDropdown title="admin" id="adminmenu">
                                        <LinkContainer to="/admin/userlist/">
                                            <NavDropdown.Item>
                                                Users
                                         </NavDropdown.Item>
                                        </LinkContainer>

                                        <LinkContainer to="/admin/productlist/">
                                            <NavDropdown.Item>
                                                Products
                                         </NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/admin/orderlist/">
                                            <NavDropdown.Item>
                                                Orders
                                         </NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>
                                )
                            }



                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;
