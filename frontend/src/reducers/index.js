import { combineReducers } from 'redux'

import auth from './auth';
import flashMessages from './flashMessages'
import searchResult from './searchResult'

export default combineReducers({
  auth,
  flashMessages,
  searchResult
});