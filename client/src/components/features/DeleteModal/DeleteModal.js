import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DeleteModal = ({ showModal, handleClose, adId }) => {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Ad</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this ad?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Link to={'/ad/remove/' + adId}>
          <Button variant="danger">Delete</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
