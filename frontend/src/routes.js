import React from 'react';

import { Route } from 'react-router-dom';

import HomePage from './page/HomePage/HomePage'
import SearchResults from './page/SearchResults/SearchResults'
import AutoSuggest from './page/SearchResults/AutoSuggest'

export default (
    <div className="container">
        <Route exact path="/" component={HomePage} />
        <Route path="/results" component={SearchResults} />
        {/* <Route path="/autosuggest" component={AutoSuggest} /> */}
    </div>
)