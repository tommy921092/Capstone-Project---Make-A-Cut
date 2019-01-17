import React from 'react';

import { Route } from 'react-router-dom';

import HomePage from './page/HomePage/HomePage'

export default (
    <div className="container">
        <Route exact path="/" component={HomePage} />
    </div>
)