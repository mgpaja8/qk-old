import { applyMiddleware, createStore} from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index';

const createStoreWithMiddleware = applyMiddleware(thunk, createLogger())(createStore);

export default createStoreWithMiddleware(rootReducer);
