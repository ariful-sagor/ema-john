import React from 'react';
import './Product.css';
import { Link } from 'react-router-dom';


const Product = (props) => {
   //console.log(props)
    const {img, name,seller,price,stock, key}= props.product;

    return (
        <div className='product'>
            <div>
                <img src={img} alt=""/>

            </div>
            <div className="product-name">
                <h4><Link to={"/product/"+ key}>{name}</Link></h4>
                <br/>
                <p><small>by: {seller}</small></p>
                <p>$ {price}</p>
                <p><small>only {stock} pieces in stock</small></p>
                <button className="main-button" 
                    onClick={()=> props.handleAdd(props.product)}>
                        Add to Cart</button>

            </div>
            
            
            
        </div>
    );
};

export default Product;