import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";

const MyNavbar = () => {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const logoutHandler = (e) => {
    dispatch(logout());
    navigateTo("/");
  };

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const cartItemCount = useSelector((state) => state.cart.items.length);
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          My Book Market
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/discover">
              Discover
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {user ? (
              <>
                <Navbar.Text className="me-2">
                  {capitalizeFirstLetter(user)}
                </Navbar.Text>
                <Button variant="outline-light" onClick={logoutHandler}>
                  Logout
                </Button>
                <Nav.Link as={Link} to="/cart">
                  Cart ({cartItemCount})
                </Nav.Link>
              </>
            ) : (
              <>
                <Button variant="outline-light" as={Link} to="/login">
                  Login
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
