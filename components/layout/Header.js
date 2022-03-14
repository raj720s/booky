import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { loaduserAction } from "../../redux/actions/userActions";
import { signOut } from "next-auth/client";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
const Header = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.loadedUser);

  useEffect(() => {
    if (!user) {
      dispatch(loaduserAction());
    }
  }, [dispatch, user]);

  const logoutHandler = () => {
    signOut();
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">
          <img src="/vercel.svg" alt="booky" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {user ? (
              <>
                <a
                  className="btn  mr-4"
                  id="dropDownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <figure className="avatar avatar-nav">
                    <img
                      src={user.avatar ? user.avatar.url : "/favicon.ico"}
                      alt={user && user.name}
                      className="rounded-circle"
                    />
                  </figure>
                </a>

                {user.role === "admin" && (
                  <>
                    <NavDropdown title={user.name} id="collasible-nav-dropdown">
                      <NavDropdown.Item>
                        <Link href="/admin/rooms">
                          <span className="dropdown-item">Rooms</span>
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link href="/admin/bookings">
                          <span className="dropdown-item">Bookings</span>
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link href="/admin/users">
                          <span className="dropdown-item">Users</span>
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link href="/admin/reviews">
                          <span className="dropdown-item">Reviews</span>
                        </Link>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                )}

                <NavDropdown title={user.name} id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/">
                    <Link href="/bookings/mybookings">
                      <span className="dropdown-item">My Bookings</span>
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/">
                    <Link href="/me/update">
                      <span className="dropdown-item">Profile</span>
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/">
                    <Link href="/">
                      <span
                        className="dropdown-item text-danger"
                        onClick={logoutHandler}
                      >
                        Logout
                      </span>
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              !loading && (
                <Link href="/login">
                  <a className="btn btn-danger px-4 text-white login-header-btn float-right">
                    Login
                  </a>
                </Link>
              )
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
