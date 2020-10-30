import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../product/Product';

const ProductDetail = () => {

    const [product, setProduct]= useState({});
    const{productkey}= useParams();
    useEffect(()=>{
        fetch('https://fast-coast-84643.herokuapp.com/products/' + productkey)
        .then(res => res.json())
        .then(data => setProduct(data))
    },[productkey])
    
    // const product= fakeData.find(pd=> pd.key===productkey);
    return (
        <div>
            {/* <h1>{productkey} Detail coming soon</h1> */}
            <Product shoeAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;