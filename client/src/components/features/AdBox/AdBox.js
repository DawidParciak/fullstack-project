import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link, NavLink } from 'react-router-dom';
import { IMG_URL } from '../../../config';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';

const AdBox = ({ title, price, localization, photo, _id, seller }) => {

  const user = useSelector(getUser);

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);


  return (
    <Col className="mt-3">
      <Card>
        <Card.Img
          crossOrigin="anonymous"
          className="img-fluid"
          style={{ objectFit: "cover", height: "300px" }}
          variant="top"
          src={IMG_URL + photo}
          alt={"offer: " + title}
          title={"Offer " + title}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle>{price} PLN</Card.Subtitle>
          <Card.Text>{localization}</Card.Text>
          <Row>
            <Col>
              <NavLink to={"/ad/" + _id}>
                <Button variant="danger">Read more</Button>
              </NavLink>
            </Col>
              {user && user.login !== null && seller === user.login && (
                <Col className="d-flex justify-content-end">
                  <Link to={"/ad/edit/" + _id} className="pe-2 text-decoration-none">
                    <Button variant="success">
                      <span className="material-symbols-outlined fs-5">edit</span>
                    </Button>
                  </Link>
                  <Link onClick={handleShow} className="text-decoration-none">
                    <Button variant="success">
                      <span className="material-symbols-outlined fs-5 align-items-end">delete</span>
                    </Button>
                  </Link>
                </Col>
              )}

              <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Delete Ad</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>Are you sure want to delete this ad?</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant='secondary' onClick={handleClose}>
                    Cancel
                  </Button>
                  <Link to={'/ad/remove/' + _id}>
                    <Button variant='danger'>
                      Delete
                    </Button>
                  </Link>
                </Modal.Footer>
              </Modal>

          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default AdBox;
