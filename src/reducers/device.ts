import * as actionTypes from '../actions/actionTypes';
const initialState = {
  deviceName: null,
  isFetching: false,
  isRegistered: null
};

function deviceState(state = initialState, action) {
  switch (action.type) {
    case actionTypes.DEVICE_REGISTRATION_LOADING:
      return { ...state, deviceName: action.response.deviceName, isFetching: true };
    case actionTypes.DEVICE_REGISTRATION_SUCCESS:
      return { ...state, isFetching:false, isRegistered: true };
    case actionTypes.DEVICE_REGISTRATION_ERROR:
      return { ...state, isFetching: false, isRegistered: false };
    default:
      return state;
  }
}

export default deviceState;
