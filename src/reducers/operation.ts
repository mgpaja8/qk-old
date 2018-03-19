import * as actionTypes from '../actions/actionTypes';
const initialState = {
  operation: null
};

function operationState(state = initialState, action) {
  switch (action.type) {
    case actionTypes.DEVICE_REGISTRATION_LOADING:
      return { ...initialState };
    case actionTypes.DEVICE_REGISTRATION_SUCCESS:
      return { ...state, operation: action.response.data };
    default:
      return state;
  }
}

export default operationState;
