import React from 'react';

import { Route } from 'react-router-dom';

import HomePage from './page/HomePage/HomePage'
import LoginModal from './page/Login/LoginModal'
import About from './page/About/About'

// Test only
import Articles from './page/Articles/Articles';
//

export default (
    <div className="container">
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginModal} />
        <Route path="/about" component={About} />
        <Route exact path="/test" component={Articles} />
        <Route path="/article/:articleid" component={Articles} />
    </div>
)