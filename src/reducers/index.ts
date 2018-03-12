import { combineReducers } from 'redux';

import deviceState from './device';

const rootReducer = combineReducers({
  device: deviceState
});

export default rootReducer;
