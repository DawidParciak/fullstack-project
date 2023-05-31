import React, { useEffect, useState } from 'react';
import { Alert, Button, Form, Image, InputGroup, Spinner } from 'react-bootstrap';
import { API_URL } from '../../../config';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';
import { useNavigate } from 'react-router-dom';
import styles from './AddAd.module.scss';
import CountdownTimer from '../CountdownTimer/CountdownTimer';
import { useForm } from 'react-hook-form'

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

  const {
    register, 
    handleSubmit: validate,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log(">>", value, name, type);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const handleSubmit = e => {

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
        if (res.status === 201) {
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
        <Form onSubmit={validate(handleSubmit)}>

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
            <Form.Control 
              {...register('title', {
                required: true,
                minLength: 10,
                maxLength: 50,
              })}
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              placeholder="Enter title" 
            />
            {errors.title && (
              <small className='d-block form-text mt-2 p-2 bg-danger text-white rounded'>
                This field is required and has to be between 10 to 50 characters long.
              </small>
            )}
          </Form.Group>    

          <Form.Group className="mb-3" controlId="formPhoto">
            <Form.Label>Photo</Form.Label>
            <Form.Control 
              {...register('photo', {
                required: true,
              })} 
              type="file" 
              onChange={e => setPhoto(e.target.files[0])} 
            />
            {errors.photo && (
              <small className='d-block form-text mt-2 p-2 bg-danger text-white rounded'>
                This field is required.
              </small>
            )}
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <InputGroup>
              <Form.Control 
                {...register('price', {
                  required: true,
                })}
                type="number" 
                value={price} 
                onChange={e => setPrice(e.target.value)} 
                placeholder="Enter price" 
              />
              <InputGroup.Text>$</InputGroup.Text>
            </InputGroup>
            {errors.price && (
              <small className='d-block form-text mt-2 p-2 bg-danger text-white rounded'>
                This field is required.
              </small>
            )}
          </Form.Group> 
          
          <Form.Group className="mb-3" controlId="formLocalization">
            <Form.Label>Localization</Form.Label>
            <Form.Control 
              {...register('localization', {
                required: true,
              })}
              type="text" 
              value={localization} 
              onChange={e => setLocalization(e.target.value)} 
              placeholder="Enter localization" 
            />
            {errors.localization && (
              <small className='d-block form-text mt-2 p-2 bg-danger text-white rounded'>
                This field is required.
              </small>
            )}
          </Form.Group> 
                    
          <Form.Group className="mb-3" controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control 
               {...register('phone', {
                required: true,
              })}
              type="tel" 
              value={user.phone} 
              onChange={e => setPhone(e.target.value)} 
              placeholder="Enter phone number" 
            />
            {errors.phone && (
              <small className='d-block form-text mt-2 p-2 bg-danger text-white rounded'>
                This field is required.
              </small>
            )}
          </Form.Group> 

          <Form.Group className="mb-3" controlId="formContent">
            <Form.Label>Content</Form.Label>
            <Form.Control 
               {...register('content', {
                required: true,
                minLength: 20,
                maxLength: 1000,
              })}
              as="textarea" 
              rows="5" 
              value={content} 
              onChange={e => setContent(e.target.value)} 
              placeholder="Enter content" 
            />
            {errors.content && (
              <small className='d-block form-text mt-2 p-2 bg-danger text-white rounded'>
                This field is required and has to be between 20 to 1000 characters long.
              </small>
            )}
          </Form.Group> 

          <Button type="submit" variant="success"  className="col-sm-6 py-2">
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
