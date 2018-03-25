import * as actionTypes from '../actions/actionTypes';
const initialState = {
  screen: null,
  shift: null,
  station: null
};

function menuState(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_SELECTED_MENU_ITEM:
      return {
        ...initialState,
        screen: action.response.screen,
        shift: action.response.shift,
        station: action.response.station
      };
    default:
      return state;
  }
}

export default menuState;
