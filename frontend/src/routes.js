import React from 'react';

import { Route } from 'react-router-dom';

import HomePage from './page/HomePage/HomePage'
import LoginModal from './page/Login/LoginModal'

export default (
    <div className="container">
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginModal} />
    </div>
)