import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/shop/Shop';
import Product from './components/product/Product';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/review/Review';
import Inventory from './components/inventory/Inventory';
import NotFound from './components/notFound/NotFound';
import ProductDetail from './components/productDetail/ProductDetail';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import { createContext } from 'react';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


export  const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser]= useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      
      <Router>
        <Header></Header>
        <Switch>
        <Route exact path="/" >
            <Shop></Shop>
          </Route>
          <Route path="/shop" >
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <Route path="/orders">
            <Inventory></Inventory>
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/product/:productkey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
      </UserContext.Provider>
  );
}

export default App;
