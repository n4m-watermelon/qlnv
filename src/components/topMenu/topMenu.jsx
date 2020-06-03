import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../action/logout";
import { Link } from "react-router-dom";

function TopMenu(props) {
  const [isOpen, setIsOpen] = useState(false);
  const status = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const toggle = () => setIsOpen(!isOpen);

  function onLogout() {
    dispatch(logOut());
    localStorage.clear()
    window.location.reload(false);
  }

  return (
    <div>
      {status === false && <Redirect exact to="/login/" />}
      {status && (
        <Navbar color="light" light expand="md">
          <NavbarBrand>LOGO</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink>
                  <Link to="/dashboard/">Home</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <Link to="/dashboard/user/">Users</Link>
                </NavLink>
              </NavItem>
            </Nav>

            {status && (
              <Button
                onClick={() => {
                  onLogout();
                }}
                color="danger"
              >
                Logout
              </Button>
            )}
          </Collapse>
        </Navbar>
      )}
    </div>
  );
}

export default TopMenu;
