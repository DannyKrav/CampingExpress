import React from 'react';
import { Switch, Route } from "react-router-dom";
import Home from './Components/Home/Home';
import Items from './Components/Items/Items';
import Cart from './Components/Cart/Cart';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';




export default (
  <Switch>
    <Route path='/items' component={Items}></Route>
    <Route path='/cart' component={Cart}></Route>
    <Route path='/login' component={Login}></Route>
    <Route path='/register' component={Register}></Route>
    <Route path='/' component={Home}></Route>
  </Switch>
);
