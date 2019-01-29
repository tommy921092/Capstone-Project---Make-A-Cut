import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import auth from "./auth";
import flashMessages from "./flashMessages";
import service from './service';
import shopServiceSettings from './shopServiceSettings';

export default combineReducers({
  auth,
  flashMessages,
  form: formReducer,
  service,
  shopServiceSettings
});
