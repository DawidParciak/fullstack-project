import { Container, Navbar } from 'react-bootstrap';

const Footer = () => {
  return (
    <Navbar variant="light" className='mt-5'>
      <Container className="d-flex justify-content-center">
        <Navbar.Text className="text-muted">
          Copyright © BoardApp 2023
        </Navbar.Text>
      </Container>
    </Navbar>
  );
};

export default Footer;
