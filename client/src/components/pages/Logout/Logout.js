import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_URL } from "../../../config";
import { logOut } from "../../../redux/usersRedux";
import { useNavigate } from "react-router-dom";
import { Alert, Col } from "react-bootstrap";
import CountdownTimer from "../../features/CountdownTimer/CountdownTimer";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: 'DELETE',
    };

    fetch(`${API_URL}auth/logout`, options)
      .then(() => {
        dispatch(logOut());
      });
  }, [dispatch, navigate]);

  return (
    <div className="my-5 d-flex justify-content-center">
      <Col xs={12} md={6} lg={4}>
        <Alert variant="success" className="text-center">
          <Alert.Heading>Success!</Alert.Heading>
          <p>You have been successfully logged out</p>
          <CountdownTimer seconds={3} onComplete={() => navigate('/')} />
        </Alert>
      </Col>
    </div>
  );
};

export default Logout;
