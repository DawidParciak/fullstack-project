import { fetchData, getAdById } from '../../../redux/adsRedux';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { IMG_URL } from '../../../config';
import { getUser } from "../../../redux/usersRedux";
import styles from './Ad.module.scss';
import moment from 'moment'
import DeleteModal from '../../features/DeleteModal/DeleteModal';

const Ad = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const adData = useSelector((state) => getAdById(state, id));
  const user = useSelector(getUser);
  const [zoomedIn, setZoomedIn] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    if (!adData) {
      dispatch(fetchData());
    }
  }, [adData, dispatch]);

  const toggleZoom = () => {
    setZoomedIn(!zoomedIn);
  };

  const adDate = moment(adData.date).format('DD.MM.YYYY');
  const adTime = moment(adData.date).format('HH:mm:ss');
  
  return (
    <div className={styles.Ad}>
      <Row className='d-flex align-items-center justify-content-between mt-5 order-1 order-lg-1'>
        <div className='d-lg-flex justify-content-lg-between px-5 mb-5'>
          <h2 className={styles.heading}>{adData.title}</h2>
          <h2 className={styles.heading}>{adData.price}$</h2>
        </div>
        <div className={`col-12 col-lg-5 ms-lg-5 order-3 order-lg-2 ${styles.AdCard}`} >
          <Card className='mb-3'>
            <Card.Body>
              <Card.Text>
                <p className='fs-5'>{adData.content}</p>
              </Card.Text>
            </Card.Body>
          </Card>
            
          <Card className='mb-3'>
            <Card.Body>
              <Card.Text className='d-flex align-items-end'>
                <span className="material-symbols-outlined fs-1 text-success">person</span>
                <h4 className='mb-1 ms-2'>{adData.seller}</h4>
              </Card.Text>
              <Card.Text className='d-flex align-items-end'>
                <span className="material-symbols-outlined fs-1 text-success">call</span>
                <h4 className='mb-1 ms-2'>{adData.phone}</h4>
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className='mb-3'>
            <Card.Body>
              <Card.Text className='d-flex align-items-end'>
                <span className="material-symbols-outlined fs-1 text-success">pin_drop</span>
                <h4 className='mb-1 ms-2'>{adData.localization}</h4>
              </Card.Text>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Text className='d-flex align-items-end'>
                <span className="material-symbols-outlined fs-1 text-success">calendar_month</span>
                <h4 className='mb-1 ms-2'>{adDate}</h4>
              </Card.Text>
              <Card.Text className='d-flex align-items-end'>
                <span className="material-symbols-outlined fs-1 text-success">schedule</span>
                <h4 className='mb-1 ms-2'>{adTime}</h4>
              </Card.Text>
            </Card.Body>
          </Card>

          <DeleteModal showModal={showModal} handleClose={handleClose} adId={id} />
        </div>

        <div className="col-12 col-lg-6 order-2 order-lg-3 mb-3 mb-lg-0">
          <img
            src={IMG_URL + adData.photo}
            alt={adData.title}
            onClick={toggleZoom}
            className={`${zoomedIn ? styles.zoomedIn : styles.normal} adImage`}
            crossOrigin="anonymous"
            id='adImage'
          />
        </div>
      </Row>

      {user !== null && user.login === adData.seller && (
        <Row>
          <Col className='mt-4 ms-lg-5 d-flex justify-content-between col-lg-5'>
            <Link to={'/ad/edit/' + id} className='col-5'>
              <Button variant='outline-success' className='col-12' size="lg">
                Edit
              </Button>
            </Link>
            <Button variant='outline-danger' onClick={handleShow} size="lg" className='col-5'>
              Delete
            </Button>
          </Col>
        </Row>
      )}

    </div>
  );
};

export default Ad;
