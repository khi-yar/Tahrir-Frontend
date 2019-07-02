import React from "react";
import { Link } from "react-router-dom";

import userSVG from "assets/img/user-logo.png";
import logoPNG from "assets/img/logo.png";

import { Nav, Navbar, NavDropdown, Image } from "react-bootstrap";
import "./style.scss"

export default ({ className }) => {
  return (
    <Navbar expand="lg" className={`bg-light ${className}`}>
      <Navbar.Brand as={Link} to={"/profile"}>
        <Image
          src={logoPNG}
          width={60}
          className="float-right header-logo"
          alt="linkerpad"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="d-flex" id="basic-navbar-nav">
        <Nav className="w-100 px-3">
          <NavDropdown
            title={
              <div>
                <Image
                  src={userSVG}
                  width={40}
                  className="float-right header-logo"
                  alt="user"
                />
                <span className="mr-2" style={{lineHeight: "40px"}}>محمد هدشی</span>
              </div>
            }
            disabled
            className="mr-auto d-inlin-block"
          >
            <div className="p-1 text-right">
              <NavDropdown.Item as={Link} to={"/profile"}>
                حساب کاربری
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to={"/help"}>
                راهنما
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to={"/logout"}>
                خروج
              </NavDropdown.Item>
            </div>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
