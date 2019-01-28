// Libary import
import React from 'react';
import ReactDOM from 'react-dom';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { Provider } from 'react-redux';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop'

import routes from './routes';

import setAuthorizationToken from './utils/setAuthorizationToken';
import {setCurrentUser,setCurrentMerchant} from './actions/userAuthAction'
import jwtDecode from 'jwt-decode'

import './index.css'

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  let decodedToken = jwtDecode(localStorage.jwtToken)

  if (decodedToken.merchant === true) {
    store.dispatch(setCurrentMerchant(decodedToken));
  } else if (decodedToken.merchant === undefined || decodedToken.merchant === null) {
    store.dispatch(setCurrentUser(decodedToken));
  }
  
}

ReactDOM.render(
  <Provider store={store}>

    <Router routes={routes}>
      <ScrollToTop>
        <div>
          <Navbar />
          {routes}
        </div>
      </ScrollToTop>
    </Router>

    <Footer />
  </Provider>,
  document.getElementById("root")
);
