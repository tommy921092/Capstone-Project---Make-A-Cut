import React from "react";

import { Route } from 'react-router-dom';

import HomePage from './page/HomePage/HomePage'
import About from './page/About/About'

// Test only
import Articles from './page/Articles/Articles';
//

import LoginPage from "./page/Login/LoginPage";
import UserLoginForm from "./page/Login/UserLoginForm";
import UserSignUpForm from "./page/Login/UserSignUpForm";
import ShopLoginForm from "./page/Login/ShopLoginForm";
import ShopSignUpForm from "./page/Login/ShopSignUpForm";
export default (
  <div className="container">
    <Route exact path="/" component={HomePage} />
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/user/login" component={UserLoginForm} />
    <Route exact path="/user/signup" component={UserSignUpForm} />
    <Route exact path="/shop/login" component={ShopLoginForm} />
    <Route exact path="/shop/signup" component={ShopSignUpForm} />
    <Route path="/about" component={About} />
    <Route path="/test" component={Articles} />
  </div>
);
