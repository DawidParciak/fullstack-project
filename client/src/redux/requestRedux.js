export const getRequest = state => state.request;
const createActionName = actionName => `app/ads/${actionName}`;
const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');
const ADD_REQUEST = createActionName('ADD_REQUEST');


export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = () => ({ type: ERROR_REQUEST });
export const addRequest = () => ({ type: ADD_REQUEST });


const reducer = (statePart = [], action) => {
  switch (action.type) {

      case START_REQUEST:
        return {
          pending: true, error: null, success: false ,
        };
      case END_REQUEST:
        return {
          pending: false, error: null, success: true ,
        };
      case ADD_REQUEST:
        return {
          pending: false, error: null, success: 'adding',
        };
      case ERROR_REQUEST:
        return {
          pending: false, error: action.error, success: false ,
        }
    default:
      return statePart
  };
}
  export default reducer;
  