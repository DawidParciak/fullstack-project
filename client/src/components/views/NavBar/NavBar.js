import { Container, Navbar, Nav, Button } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar variant="dark" className="mt-0 navbar-color" expand="lg">
      <Container>
        <Navbar.Brand href="/" className="ps-5 d-flex align-items-center">
          <img src="/pngegg.png" alt="Logo" className="me-2" style={{ width: "60px" }} />
          <div className="d-flex flex-column">
            <span className="h2 mb-0 ps-2">board.</span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/register" className="pe-3">
              <Button variant="danger" size="lg" className="d-flex align-items-center">
                <span className="material-symbols-outlined pe-2">
                  person_add
                </span>
                <span>
                  Register
                </span>
              </Button>
            </Nav.Link>
            <Nav.Link href="/login" className="pe-5">
              <Button variant="outline-danger" size="lg" className="d-flex align-items-center">
                <span className="material-symbols-outlined pe-2">
                  login
                </span>
                <span>
                  Login
                </span>
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;