import React from 'react';
import "./ReviewItem.css"

const ReviewItem = (props) => {
    const {name,quantity,key,price} = props.product;
    const reviewItemStyle = {
        borderBottom: '1px solid grey',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '200px'
    }
    return (
        <div style={reviewItemStyle} className="product">
            <h4 className="product-name">{name}</h4>
            <p>Quanrity: {quantity}</p>
            <p><small>${price}</small></p>
            <br/>
            <button 
                className="main-button"
                onClick={()=>props.removeProduct(key)}>
                    Remove Item</button>
            
        </div>
    );
};

export default ReviewItem;
