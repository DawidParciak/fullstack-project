import { useSelector } from "react-redux";
import { getUser } from "../../../redux/usersRedux";

const { Button, Col, Card, Row } = require("react-bootstrap");
const { IMGS_URL } = require("../../../config");
const { Link } = require("react-router-dom");

const Ad = ({ title, content, date, photo, price, localization, seller, _id }) => {
  const user = useSelector(getUser);

  const renderEditButton = () => {
    if (user && user.login !== null && seller === user.login) {
      return (
        <Link to={"/ad/edit/" + _id} className="justify-content-end d-flex text-decoration-none">
          <Button variant="success">Edit add</Button>
        </Link>
      );
    } else {
      return null;
    }
  };

  return (
    <Col md="4" className="mt-5">
      <Card>
        <Card.Img
          crossOrigin="anonymous"
          className="img-fluid"
          style={{ objectFit: "cover", height: "300px" }}
          variant="top"
          src={IMGS_URL + photo}
          alt={"offer: " + title}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle>{price} PLN</Card.Subtitle>
          <Card.Text>{localization}</Card.Text>
          <Row>
            <Col>
              <Link to={"/ad/" + _id}>
                <Button variant="danger">Read more</Button>
              </Link>
            </Col>
            <Col>
              {renderEditButton()}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Ad;
