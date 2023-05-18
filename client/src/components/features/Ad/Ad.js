const { Button, Col, Card } = require("react-bootstrap")
const { IMGS_URL } = require("../../../config")
const { Link } = require("react-router-dom")

const Ad = ({ title, content, date, photo, price, localization, seller, _id }) => {
  return(
    <Col md="4" className="mt-5">
      <Card>
        <Card.Img 
          crossOrigin="anonymous" 
          className="img-fluid" 
          style={{ objectFit: 'cover', height: '300px' }} 
          variant="top" src={IMGS_URL + photo} 
          alt={'offer: ' + title} 
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle>{price} PLN</Card.Subtitle>
          <Card.Text>{localization}</Card.Text>
          <Link to={'/ad/' + _id}>
            <Button variant="danger">
              Read more
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default Ad;
