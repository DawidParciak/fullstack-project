import { Row } from "react-bootstrap";
import Ad from "../Ad/Ad"

const Ads = ({ ads }) => (
  <Row className="justify-content-center">
    {ads.map(a => (
      <Ad key={a._id} {...a} />
    ))}
  </Row>

)

export default Ads;
