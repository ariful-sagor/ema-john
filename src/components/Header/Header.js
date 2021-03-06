import React, { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png'
import './Header.css'
const Header = () => {
    const [loggedInUser, setLoggedInUser]= useContext(UserContext);
    
   
    return (
        <div className="header">
            <img src={logo}></img>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Review</Link>
                <Link to="/orders">Order History </Link>
                <br />
                <h3>{loggedInUser.name}</h3>
                 
                
                {/* <button onClick={() => setLoggedInUser({})}>Sign Out</button> */}
            </nav>
        </div>
    );
};

export default Header;