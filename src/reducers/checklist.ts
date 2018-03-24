import * as actionTypes from '../actions/actionTypes';
const initialState = {
  shift: null,
  station: null
};

function checklistState(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_CHECKLIST:
      return { ...state, shift: action.response.shift, station: action.response.station };
    default:
      return state;
  }
}

export default checklistState;
