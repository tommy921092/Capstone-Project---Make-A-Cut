import { combineReducers } from 'redux'

import auth from './auth';
import flashMessages from './flashMessages'
import service from './service';

export default combineReducers({
  auth,
  flashMessages,
  service
});