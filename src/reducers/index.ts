import { combineReducers } from 'redux';

import deviceState from './device';
import tasksState from './tasks';

const rootReducer = combineReducers({
  device: deviceState,
  tasks: tasksState
});

export default rootReducer;
