import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getUser } from "../../../redux/usersRedux";
import { NavLink } from "react-router-dom";

const NavBar = () => {

  const user = useSelector(getUser);

  return (
    <Navbar variant="dark" className="mt-0 navbar-color" expand="lg">
      <Container>
        <NavLink to="/" className="text-decoration-none">
          <Navbar.Brand className="d-flex align-items-center">
            <img src="/pngegg.png" alt="Logo" className="me-2" style={{ width: "60px" }} />
            <div className="d-flex flex-column">
              <span className="h2 mb-0 ps-2">board.</span>
            </div>
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-end">

            {!user && (
              <NavLink to="/register" className="pe-lg-3 pb-2 pb-lg-0 text-decoration-none">
                <Button variant="danger" size="lg" className="d-flex align-items-center">
                  <span className="material-symbols-outlined pe-2">
                    person_add
                  </span>
                  <span>
                    Register
                  </span>
                </Button>
              </NavLink>
            )}
            {!user && (
              <NavLink to="/login" className="pb-2 pb-lg-0 text-decoration-none">
                <Button variant="outline-danger" size="lg" className="d-flex align-items-center">
                  <span className="material-symbols-outlined pe-2">
                    login
                  </span>
                  <span>
                    Login
                  </span>
                </Button>
              </NavLink>
            )}

            {user && (
              <NavLink to="/ad/add" className="pe-lg-3 pb-2 pb-lg-0 text-decoration-none">
                <Button variant="success" size="lg" className="d-flex align-items-center">
                  <span className="material-symbols-outlined pe-2">
                    add_box
                  </span>
                  <span>
                    Add ad
                  </span>
                </Button>
              </NavLink>
            )}

            {user && (
              <NavLink to="/user" className="pe-lg-3 pb-2 pb-lg-0 text-decoration-none">
                <Button variant="danger" size="lg" className="d-flex align-items-center">
                  <span className="material-symbols-outlined pe-2">
                    person
                  </span>
                  <span>
                    {user.login}
                  </span>
                </Button>
              </NavLink>
            )}

            {user && (
            <NavLink to="/logout" className="pb-2 pb-lg-0 text-decoration-none">
              <Button variant="danger" size="lg" className="d-flex align-items-center">
                <span className="material-symbols-outlined pe-2">
                  logout
                </span>
                <span>
                  Logout
                </span>
              </Button>
            </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;