import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import './Shop.css'
import Product from '../product/Product';
import '../product/Product'
import Cart from '../Cart/Cart'
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';



const Shop = () => {
    // const first10= fakeData.slice(0,10);
    const [products, setProducts]=useState([])
    const [cart,setCart]=useState([])
    
    useEffect(()=>{
        fetch("https://fast-coast-84643.herokuapp.com/products")
        .then(res => res.json())
        .then(data => setProducts(data))
    })

    useEffect(()=>{
        const saveCart = getDatabaseCart();
        const productkeys = Object.keys(saveCart);
        fetch("https://fast-coast-84643.herokuapp.com/productsByKeys", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(productkeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))

    },[])
    const handleAdd= (product)=>{
        const toBeAdded= product.key;
        const sameProduct= cart.find(pd=> pd.key=== toBeAdded);
        let count=1;
        let newCart;
        if(sameProduct){
            const count= sameProduct.quantity+1;
            sameProduct.quantity= count;
            const others= cart.filter(pd=> pd.key !== toBeAdded);
            newCart=[...others, sameProduct];

        }
        else{
            product.quantity=1;
            newCart=[...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key,count);

    }

    return (
        <div className="shop-container">
            <div className="product-container">
             
            {
            products.map(pd=> <Product
                key={pd.key}
                showAddToCart={true}
                handleAdd= {handleAdd}
                product={pd}>{products.name}</Product>)
            }
            
            </div>
            <div className="cart-container">
               <Cart cart={cart}>
               <Link to='/review'>
                    <button className="main-button">Review Order</button>
                </Link>
               </Cart>
            </div>
            

        </div>
    );
};

export default Shop;