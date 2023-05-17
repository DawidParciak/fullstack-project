import { createStore, combineReducers } from 'redux';
import initialState from './initialState';

// import reducers
import usersReducer from './usersRedux';
import adsReducer from './adsRedux';

const subreducers = {
  user: usersReducer,
  ads: adsReducer,
}

const reducer = combineReducers(subreducers);

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
