import * as actionTypes from '../actions/actionTypes';
const initialState = {
  employee: null,
  isFetching: false,
  isLoggedIn: null,
  taskGroups: null
};

function userState(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_USER_LOADING:
      return { ...initialState, isFetching: true };
    case actionTypes.FETCH_USER_SUCCESS:
      return { employee: action.response.data, isFetching:false, isLoggedIn: true, taskGroups: [] };
    case actionTypes.FETCH_USER_ERROR:
      return { ...state, isFetching: false, isLoggedIn: false };
    case actionTypes.SIGN_OUT:
      return {...initialState};
    default:
      return state;
  }
}

export default userState;
