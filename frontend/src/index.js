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
import Navbar from './components/Navbar'
import routes from './routes';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk, logger)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes}>
      <div>
        <Navbar />
        {routes}
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);