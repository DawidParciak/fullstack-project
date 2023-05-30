import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link, NavLink } from 'react-router-dom';
import { IMG_URL } from '../../../config';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';
import styles from './AdBox.module.scss';
import DeleteModal from '../DeleteModal/DeleteModal';

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
          className={styles.cardImage}
          variant="top"
          src={IMG_URL + photo}
          alt={'offer: ' + title}
          title={'Offer ' + title}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle>{price} $</Card.Subtitle>
          <Card.Text>{localization}</Card.Text>
          <Row className="align-items-center">
            <Col>
              <NavLink to={'/ad/' + _id}>
                <Button variant="danger">Read more</Button>
              </NavLink>
            </Col>
            {user && user.login !== null && seller === user.login && (
              <Col className="d-flex justify-content-end">
                <Link to={'/ad/edit/' + _id} className="pe-2 text-decoration-none">
                  <Button variant="success">
                    <span className="material-symbols-outlined fs-5 align-middle">edit</span>
                  </Button>
                </Link>
                <Link onClick={handleShow} className="text-decoration-none">
                  <Button variant="success">
                    <span className="material-symbols-outlined fs-5 align-middle">delete</span>
                  </Button>
                </Link>
              </Col>
            )}
          </Row>
        </Card.Body>
      </Card>
      <DeleteModal showModal={showModal} handleClose={handleClose} adId={_id} />
    </Col>
  );
};

export default AdBox;
