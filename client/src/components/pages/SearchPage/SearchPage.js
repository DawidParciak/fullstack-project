import { useDispatch, useSelector } from "react-redux";
import AdBox from "../../features/AdBox/AdBox";
import { Container, Row, Col, Alert } from "react-bootstrap"
import { fetchAdvertBySearchPhrase, getAllAds } from "../../../redux/adsRedux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const SearchPage = () => {

  const dispatch = useDispatch();
  const { searchPhrase } = useParams();
  const ads = useSelector(getAllAds);

  useEffect(() => {
    dispatch(fetchAdvertBySearchPhrase(searchPhrase));
  }, [dispatch, searchPhrase]);

  return(
    <Container className="mt-5">
      {ads.length === 0 ? (
      <div className="my-5 d-flex justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <Alert variant="warning" className="my-5 text-center">
              <Alert.Heading>Sorry!</Alert.Heading>
              <p>There is no offer for <i>{searchPhrase}</i> phrase!</p>
          </Alert>
        </Col>
        </div>
      ) : (
        <>
          <Row>
            <Col>
              {ads.length === 1 && (
                <h2>Found {ads.length} result for <i>{searchPhrase}</i> search!</h2>
              )}
              {ads.length > 1 && (
                <h2>Found {ads.length} results for <i>{searchPhrase}</i> search!</h2>
              )}
            </Col>
          </Row>
          <Row xs={1} md={2} lg={3} className='g-3 '>
            {ads.map((ad) => (
              <Col key={ad._id}>
                <AdBox {...ad} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );

};

export default SearchPage;
