import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <Navbar bg="light" variant="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">MyApp</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "active nav-link"
                    : "nav-link"
                }
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "active nav-link"
                    : "nav-link"
                }
                to="/about"
              >
                About
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "active nav-link"
                    : "nav-link"
                }
                to="/books"
              >
                Books
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "active nav-link"
                    : "nav-link"
                }
                to="/users"
              >
                Users
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "active nav-link"
                    : "nav-link"
                }
                to="/register"
              >
                Register
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
