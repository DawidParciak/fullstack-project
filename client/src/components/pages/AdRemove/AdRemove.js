import CountdownTimer from "../../features/CountdownTimer/CountdownTimer";

const { useEffect } = require("react");
const { useDispatch } = require("react-redux");
const { API_URL } = require("../../../config");
const { removeAd } = require("../../../redux/adsRedux");
const { useParams, useNavigate } = require("react-router-dom");
const { Alert, Col } = require("react-bootstrap");

const AdRemove = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams()

  useEffect(() => {
    const options = {
      method: 'DELETE',
    };

    fetch(`${API_URL}api/ads/${id}`, options)
      .then(() => {
        dispatch(removeAd(id));
      });
  }, [dispatch, navigate, id]);

  return (
    <div className="my-5 d-flex justify-content-center">
      <Col xs={12} md={6} lg={4}>
        <Alert variant="success" className="text-center">
          <Alert.Heading>Success!</Alert.Heading>
          <p>You are successfully delete add</p>
          <CountdownTimer seconds={3} onComplete={() => navigate('/')} />
        </Alert>
      </Col>
    </div>
  );
}

export default AdRemove;
