import React, { useState } from 'react';
import { Button, Form, Image, Spinner } from 'react-bootstrap';
import { API_URL } from '../../../config';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';
import { useNavigate } from 'react-router-dom';

const AddAdForm = () => {

  const user = useSelector(getUser)
  const newDate = new Date();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [localization, setLocalization] = useState('');
  const [phone, setPhone] = useState('');
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState(null);
  const [status, setStatus] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    const fd = new FormData();
    fd.append('title', title);
    fd.append('content', content)
    fd.append('date', newDate);
    fd.append('photo', photo);
    fd.append('price', price);
    fd.append('localization', localization);
    fd.append('seller', user.login);
    fd.append('phone', phone)

    const options = {
      method: 'POST',
      body: fd
    };

    setStatus('loading');
    fetch(`${API_URL}api/ads`, options)
      .then(res => {
        if (res.status === 200) {
          setStatus('success');
          navigate('/');
        }
        else if (res.status === 401) {
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
    <section className="d-flex align-items-center justify-content-between">c

      <div className="col-12 col-sm-5 ms-5">
        <Form onSubmit={handleSubmit}>

          <h1 className="my-5">Ad your's add!</h1>

          {status === "loading" && (
            <Spinner animation="border" role="status" className="block mx-auto">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}

          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter title" />
          </Form.Group>    

          <Form.Group className="mb-3" controlId="formPhoto">
            <Form.Label>Photo</Form.Label>
            <Form.Control type="file" onChange={e => setPhoto(e.target.files[0])} />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Enter price" />
          </Form.Group> 
          
          <Form.Group className="mb-3" controlId="formLocalization">
            <Form.Label>Localization</Form.Label>
            <Form.Control type="text" value={localization} onChange={e => setLocalization(e.target.value)} placeholder="Enter localization" />
          </Form.Group> 
                    
          <Form.Group className="mb-3" controlId="formLocalization">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Enter phone number" />
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
          <Image src="/pngeggmirror.png" alt="Logo" style={{ height: "400px" }} />
        </div>
      </div>

    </section>
)};

export default AddAdForm;
