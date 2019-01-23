import React from "react";

import { Route } from 'react-router-dom';

import HomePage from './page/HomePage/HomePage'
import About from './page/About/About'

// Test only
import Articles from './page/Articles/Articles';
//

//keep/remove redux??
import LoginPage from "./page/Login/LoginPage";
import UserLoginForm from "./page/Login/UserLoginForm";
import UserSignUpForm from "./page/Login/UserSignUpForm";
import ShopLoginForm from "./page/Login/ShopLoginForm";
import ShopSignUpForm from "./page/Login/ShopSignUpForm";
import Page from './page/Login/Page';

import UserMenuWithContent from './page/UserProfile/UserMenuWithContent';
import ShopMenuWithContent from './page/ShopProfile/ShopMenuWithContent';
export default (
  <div className="container">
    <Route exact path="/" component={HomePage} />
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/user/login" component={UserLoginForm} />
    <Route exact path="/user/signup" component={Page} />
    <Route exact path="/shop/login" component={ShopLoginForm} />
    <Route exact path="/shop/signup" component={ShopSignUpForm} />
    <Route path="/about" component={About} />
    <Route path="/test" component={Articles} />
    <Route path="/user/profile" component={UserMenuWithContent} />
    <Route path="/shop/profile" component={ShopMenuWithContent} />
  </div>
);
