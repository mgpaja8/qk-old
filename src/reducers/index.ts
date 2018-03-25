import { combineReducers } from 'redux';

import deviceState from './device';
import tasksState from './tasks';
import userState from './user';
import operationState from './operation';
import checklistState from './checklist';
import menuState from './menu';

const rootReducer = combineReducers({
  device: deviceState,
  tasks: tasksState,
  user: userState,
  operation: operationState,
  checklist: checklistState,
  menu: menuState
});

export default rootReducer;
