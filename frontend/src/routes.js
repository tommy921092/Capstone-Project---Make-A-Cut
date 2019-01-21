import React from "react";

import { Route } from "react-router-dom";

import HomePage from "./page/HomePage/HomePage";
import LoginPage from "./page/Login/LoginPage";
import UserLoginForm from "./page/Login/UserLoginForm";
import UserSignUpForm from "./page/Login/UserSignUpForm";
import ShopLoginForm from "./page/Login/ShopLoginForm";
export default (
  <div className="container">
    <Route exact path="/" component={HomePage} />
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/user/login" component={UserLoginForm} />
    <Route exact path="/user/signup" component={UserSignUpForm} />
    <Route exact path="/shop/login" component={ShopLoginForm} />
  </div>
);
