import { Spinner, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAds, getRequest, loadAdsRequest } from "../../../redux/adsRedux";
import { useEffect } from "react";
import Ads from "../Ads/Ads";

const AdBox = () => {

  const dispatch = useDispatch();
  const ads = useSelector(getAds)
  const request = useSelector(getRequest);

  useEffect(() => {
    dispatch(loadAdsRequest());
  }, [dispatch]);

  if (request.pending)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spinner animation="border" />
      </div>
    );
  else if (request.error)
    return (
      <Alert variant="warning">{request.error}</Alert>
    );
  else if (!request.success || !ads.length)
    return <Alert variant="info">No ads</Alert>;
  else if (request.success)
    return <Ads ads={ads} />;
};

export default AdBox;
