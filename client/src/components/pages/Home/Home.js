import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Container, Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, getAllAds } from '../../../redux/adsRedux';
import { useEffect } from 'react';
import AdBox from '../../features/AdBox/AdBox';
import { useNavigate } from 'react-router-dom';
import { getRequest } from '../../../redux/requestRedux';

const Home = () => {
  const ads = useSelector(getAllAds);
  const request = useSelector(getRequest);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchData())

  }, [dispatch]);


  const handleSubmit = e => {
    e.preventDefault();

    navigate(`/ad/search/${search}`)
  }

  if (request.pending) return (
    <div className="my-5 d-flex justify-content-center">
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    </div>
  )
  else return (
    <Container className='mt-5'>
      <div>
        <Row className='justify-content-between'>
          <Col>
            <h1>All ads:</h1>
          </Col>
          <Col>
            <Form className='d-flex'onSubmit={handleSubmit} >
              <Form.Control
                type='input'
                placeholder='Search'
                onChange={(e) => setSearch(e.target.value)}
                required
              />
              <Button variant='success' className='ms-3' type='submit'>Search</Button>
            </Form>
          </Col>

        </Row>
        <Row xs={1} md={2} lg={3} className='g-3 '>
          {ads.map((ad) => (
            <Col key={ad._id}>
              <AdBox {...ad} />
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default Home;
