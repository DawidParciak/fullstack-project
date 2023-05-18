// selectors
export const getUser = ({ user }) => user;

// actions
const createActionName = (actionName) => `app/users/${actionName}`;
const LOG_IN = createActionName('LOG_IN');
const LOG_OUT = createActionName('LOG_OUT');

// action creators
export const logIn = payload => ({
    type: LOG_IN,
    payload
});

export const logOut = () => ({
    type: LOG_OUT,
});


// initial state 
const initialState = (null);

// reducer
export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case LOG_IN:
        return action.payload;
    case LOG_OUT:
        return null
    default:
        return statePart;
  }
}
