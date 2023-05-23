import { API_URL } from '../config.js';
import shortid from 'shortid';

// selectors
export const getAllAds = ({ ads }) => ads;
export const getAdById = ({ ads }, id) => ads.find(ad => ad._id === id);

// actions
const createActionName = (actionName) => `app/ads/${actionName}`;
const EDIT_AD = createActionName('EDIT_AD');
const UPDATE_ADS = createActionName('UPDATE_ADS');
const ADD_AD = createActionName('ADD_AD');
const REMOVE_AD = createActionName('REMOVE_AD');
const SEARCH_ADS = createActionName('SEARCH_ADS');

// action creators
export const editAd = (payload) => ({ type: EDIT_AD, payload });
export const updateAds = (payload) => ({ type: UPDATE_ADS, payload });
export const addAd = (payload) => ({ type: ADD_AD, payload });
export const removeAd = (payload) => ({ type: REMOVE_AD, payload });
export const searchAd = (searchPhrase) => ({
  type: SEARCH_ADS,
  payload: { searchPhrase },
});

export const fetchData = () => {
  return (dispatch) => {
    fetch(API_URL + 'api/ads')
      .then((res) => res.json())

      .then((ads) => dispatch(updateAds(ads)));
  };
};

export const fetchAdvertBySearchPhrase = (searchPhrase) => {
  return (dispatch) => {
    fetch(API_URL + 'api/ads/search/' + searchPhrase)
      .then((res) => res.json())
      .then((ads) => dispatch(updateAds(ads)));
    dispatch(searchAd(searchPhrase));
  };
};

const adsReducer = (statePart = [], action) => {
  switch (action.type) {
    case EDIT_AD:
      return statePart.map((ad) =>
        ad.id === action.payload.id ? { ...ad, ...action.payload } : ad
      );
    case UPDATE_ADS:
      return [...action.payload];
    case ADD_AD:
      return [...statePart, { ...action.payload, id: shortid() }];
    case REMOVE_AD:
      return statePart.filter((ad) => ad._id !== action.payload);
    case SEARCH_ADS:
      return statePart.filter((ad) => ad.title.includes(action.payload));
    default:
      return statePart;
  }
};

export default adsReducer;
