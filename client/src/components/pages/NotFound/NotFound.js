import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container className="d-flex justify-content-center py-5">
      <Row>
        <Col className="text-center">
          <p className="lead">Ooops...</p>
          <h1 className="display-1">404</h1>
          <p className="lead">Sorry, the page not found</p>
          <Link to={'/'}>
            <Button variant='danger' className='p-3'>
              Return to the main page
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
