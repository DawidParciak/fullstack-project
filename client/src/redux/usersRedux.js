import { API_URL } from "../config";

// selectors
export const getUser = ({ user }) => user;
export const getUserId = ({ userData }) => userData


// actions
const createActionName = (actionName) => `app/users/${actionName}`;
const LOG_IN = createActionName('LOG_IN');
const LOG_OUT = createActionName('LOG_OUT');
const UPDATE_DATA = createActionName('UPDATE_DATA')

// action creators
export const updateData = (payload) => ({ 
    type: UPDATE_DATA, 
    payload 
});

export const logIn = payload => ({
    type: LOG_IN,
    payload
});

export const logOut = () => ({
    type: LOG_OUT,
});

export const fetchUserData = () => {
    return (dispatch) => {
      fetch(API_URL + 'auth/user')
        .then((res) => res.json())
  
        .then((user) => dispatch(updateData(user)));
    };
  };


// initial state 
const initialState = (null);

// reducer
export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case LOG_IN:
        return action.payload;
    case LOG_OUT:
        return null
    case UPDATE_DATA:
        return action.payload;
    default:
        return statePart;
  }
}
