

import React from "react";
import {CardElement} from '@stripe/react-stripe-js';

const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
      base: {
        iconColor: '#c4f0ff',
        color: '#fff',
        fontWeight: 500,
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        ':-webkit-autofill': {color: '#fce883'},
        '::placeholder': {color: '#87bbfd'},
      },
      invalid: {
        iconColor: '#ffc7ee',
        color: '#ffc7ee',
      },
    },
  };
  
  const simpleCardForm = ({onChange}) => (
    <fieldset className="FormGroup">
      <div className="FormRow">
        <CardElement options={CARD_OPTIONS} onChange={onChange} />
      </div>
    </fieldset>
  );
  
export default simpleCardForm;