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
    dispatch(loadAdsRequest())
  }, [dispatch])

  if(request.pending) return <Spinner />; 
  else if(request.error) return <Alert color="warning">{request.error}</Alert>;
  else if(!request.success || !ads.length) return <Alert color="info">No ads</Alert>;
  else if(request.success) 
  return (
    <Ads ads={ads}  />
  )
}

export default AdBox;
