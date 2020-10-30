import React, { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ReviewItem from '../reviewitem/ReviewItem';
import Cart from "../Cart/Cart";
import happy from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart,setCart]= useState([]);
    const [orderPlaced, setOrderPlaced]= useState(false);
    const history= useHistory()
    const handleProceedCheckout=()=> {


        history.push(`/shipment`);
    }
    const removeProduct= (productkey) => {
        const newCart= cart.filter(pd=> pd.key!== productkey);
        setCart(newCart);
        removeFromDatabaseCart(productkey);
    }
    useEffect(()=>{
        const saveCart= getDatabaseCart();
        const productkeys=  Object.keys(saveCart);
        
        fetch("https://fast-coast-84643.herokuapp.com/productsByKeys", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(productkeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
    },[]);
    let thankyou;
    if(orderPlaced){
        thankyou= <img src={happy} alt=""/>
    }

    return (

        <div className="shop-container"> 
            <div className="product-container">
                {
                cart.map(pd=> <ReviewItem
                    key={pd.key} 
                    removeProduct={removeProduct}
                    product={pd}></ReviewItem>)
                }{
                    thankyou
                }
            </div> 
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button>
                </Cart>
            </div>    
        </div>
    );
};

export default Review;