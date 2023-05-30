import React, { useState } from 'react';
import { Alert, Button, Form, Image, InputGroup, Spinner } from 'react-bootstrap';
import { API_URL } from '../../../config';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';
import { useNavigate } from 'react-router-dom';
import styles from './AddAd.module.scss';
import CountdownTimer from '../CountdownTimer/CountdownTimer';

const AddAd = () => {

  const user = useSelector(getUser)
  const newDate = new Date();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [localization, setLocalization] = useState('');
  const [phone, setPhone] = useState(user.phone || '');
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState(null);
  const [status, setStatus] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    const fd = new FormData();
    fd.append('title', title);
    fd.append('content', content);
    fd.append('date', newDate);
    fd.append('photo', photo);
    fd.append('price', price);
    fd.append('localization', localization);
    fd.append('seller', user.login);
    fd.append('phone', phone);

    const options = {
      method: 'POST',
      body: fd
    };

    setStatus('loading');
    fetch(`${API_URL}api/ads`, options)
      .then(res => {
        if (res.status === 200) {
          setStatus('success');
        }
        else if (res.status === 400) {
          setStatus('clientError');
        }
        else {
          setStatus('serverError');
        }
      })
      .catch(err => {
        setStatus('serverError');
      });
  };

  return(
    <section className="d-flex align-items-center justify-content-between">

      <div className="col-12 col-sm-5 ms-5">
        <Form onSubmit={handleSubmit}>

          <h1 className="my-5">Ad your's add!</h1>

          {status === "success" && (
            <Alert variant="success">
              <Alert.Heading>Success!</Alert.Heading>
              <p>You are successfully add your ad!</p>
              <CountdownTimer seconds={3} onComplete={() => navigate('/')} />
            </Alert>
          )}

          {status === "clientError" && (
            <Alert variant="danger">
              <Alert.Heading>No enough data</Alert.Heading>
              <p>You have to fill all the fields.</p>
            </Alert>
          )}

          {status === "serverError" && (
            <Alert variant="danger">
              <Alert.Heading>Something went wrong...</Alert.Heading>
              <p>Unexpected error... Try again!</p>
            </Alert>
          )}

          {status === "loading" && (
            <Spinner animation="border" role="status" className="block mx-auto">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}

          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control minLength={10} maxLength={50} type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter title" />
          </Form.Group>    

          <Form.Group className="mb-3" controlId="formPhoto">
            <Form.Label>Photo</Form.Label>
            <Form.Control required type="file" onChange={e => setPhoto(e.target.files[0])} />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <InputGroup>
              <Form.Control type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Enter price" />
              <InputGroup.Text>$</InputGroup.Text>
            </InputGroup>
          </Form.Group> 
          
          <Form.Group className="mb-3" controlId="formLocalization">
            <Form.Label>Localization</Form.Label>
            <Form.Control type="text" value={localization} onChange={e => setLocalization(e.target.value)} placeholder="Enter localization" />
          </Form.Group> 
                    
          <Form.Group className="mb-3" controlId="formLocalization">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="tel" value={user.phone} onChange={e => setPhone(e.target.value)} placeholder="Enter phone number" />
          </Form.Group> 

          <Form.Group className="mb-3" controlId="formContent">
            <Form.Label>Content</Form.Label>
            <Form.Control as="textarea" rows="5" value={content} onChange={e => setContent(e.target.value)} placeholder="Enter content" />
          </Form.Group> 

          <Button type="submit" variant="danger"  className="col-sm-6 py-2">
            Submit
          </Button>
          
        </Form>
      </div>

      <div className="col-12 col-sm-5 mt-5 justify-content-end">
        <div className="d-flex justify-content-center" >
          <Image src="/pngeggmirror.png" alt="Logo" className={styles.logo} />
        </div>
      </div>

    </section>
  );
};

export default AddAd;
