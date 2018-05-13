import {combineReducers} from 'redux';
import itemReducer from './itemReducer';
import catalogReducer from './catalogReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  item: itemReducer,
  items: catalogReducer,
  user: userReducer
});

export default rootReducer;
