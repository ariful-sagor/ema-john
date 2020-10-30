import React from 'react';
import Product from '../product/Product';
import { Link } from 'react-router-dom';


const cart = (props) => {
    const cart= props.cart;
   // const totalPrize=cart.reduce((total, prd)=> total+ prd.price , 0);
   let totalPrize=0;
   for (let i =0; i < cart.length; i++) {
       const product= cart[i];
       totalPrize= totalPrize+ product.price * (product.quantity|| 1);
       debugger;
   }
    return (
        <div>
            <h1>Order Summay</h1>
            <p>Item Ordered: {cart.length}</p>
            <p>Total Prize: {totalPrize}</p>
            {
                props.children
            }
        </div>
    );
};

export default cart;