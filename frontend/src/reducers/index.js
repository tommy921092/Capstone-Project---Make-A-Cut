import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import auth from "./auth";
import flashMessages from "./flashMessages";
import searchResult from "./searchResult";
import service from './service';

export default combineReducers({
  auth,
  flashMessages,
  searchResult,
  form: formReducer,
  service,
});
