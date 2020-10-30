import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './Shipment.css';

const Shipment = () => {
  const { register, handleSubmit, errors } = useForm();
  const [loggedInUser, setLoggedInUser]= useContext(UserContext)
  const onSubmit = data => {
    const saveCart = getDatabaseCart();
    const orderDetails ={...loggedInUser, products: saveCart, shipment: data, orderTime: new Date()};
    fetch("https://fast-coast-84643.herokuapp.com/addOrder",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderDetails)
    })
    .then(res => res.json())
    .then(data =>{
      if(data){
        processOrder();
        alert("Order successfully")
      }
    })

  }

  return (
      <div className="row">
        <div className="col-md-6">
          <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
          <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Enter Your Name " />
          {errors.name && <span className='error'>Name is required</span>}

          <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Enter Your Email " />
          {errors.email && <span className='error'>Email is required</span>}

          <input name="address" ref={register({ required: true })} placeholder="Enter Your Address " />
          {errors.address && <span className='error'>Address is required</span>}  

          <input name="phone" ref={register({ required: true })} placeholder="Enter Your Phone No. "/>
          {errors.phone && <span className='error'>Phone No. is required</span>}

          <input type="submit" />
        </form>
      </div>
      <div className="col-md-6">
        <h3>Payment Method</h3>
        <ProcessPayment></ProcessPayment>
      </div>
    </div>
  );
};

export default Shipment;