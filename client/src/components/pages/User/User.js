import { useSelector } from "react-redux";
import { getUser } from "../../../redux/usersRedux";
import { Card, Row } from "react-bootstrap";
import { IMG_URL } from "../../../config";

import styles from './User.module.scss'

const User = () => {

  const user = useSelector(getUser);

  return(
    <div className="my-5">
      {user && (
      <Row className='d-flex align-items-center justify-content-between mt-5'>
          <div className='col-12 col-lg-5 ms-lg-5 order-2 order-lg-1'>
            <Card>
              <Card.Body>
                <Card.Text className="fs-2 ">
                  <span><b>Login: </b></span> 
                  {user.login}
                </Card.Text>
                <Card.Text className="fs-2">
                  <span><b>Phone: </b></span> 
                  {user.phone}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-12 col-lg-6 order-1 order-lg-2 mb-3 mb-lg-0">
            <div className="d-flex justify-content-center align-items-center">
              <img
                src={IMG_URL + user.avatar}
                alt={user.avatar}
                crossOrigin="anonymous"
                className={`${styles.circular} img-fluid`}
              />
            </div>
          </div>
        </Row>
      )}
    </div>
  );
};

export default User;
