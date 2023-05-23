import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, getAllAds } from '../../../redux/adsRedux';
import { useEffect } from 'react';
import AdBox from '../../features/AdBox/AdBox';

const Home = () => {
  const ads = useSelector(getAllAds);
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchData()), [dispatch]);

  return (
    <Container className='mt-5'>
    {!ads ? (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    ) : (
      <Row xs={1} md={2} lg={3} className='g-3 '>
        {ads.map((ad) => (
          <Col key={ad._id}>
            <AdBox {...ad} />
          </Col>
        ))}
      </Row>
    )}
  </Container>
  );
};

export default Home;
