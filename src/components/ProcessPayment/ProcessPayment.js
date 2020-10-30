import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {CardElement} from '@stripe/react-stripe-js';
import simpleCardForm from './simpleCardForm';

const stripePromise = loadStripe('sk_test_51HZg84IPjsjz1uh34vYub9zcvCWipne3fFtKgF2esMRXyOhmnRWPyddMDwXsEvpY1kIZ4aXB265eCQ8DUfr02eGI00chDZhJWH');

const ProcessPayment = () => {
  return (
      <div>
        <Elements stripe={stripePromise}>
            <simpleCardForm></simpleCardForm>
        </Elements>
    </div>
  );
};


export default ProcessPayment;