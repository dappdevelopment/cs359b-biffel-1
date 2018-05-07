import {combineReducers} from 'redux';
import itemReducer from './itemReducer';
import catalogReducer from './catalogReducer';

const rootReducer = combineReducers({
  item: itemReducer,
  items: catalogReducer
});

export default rootReducer;
