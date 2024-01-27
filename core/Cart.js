import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "react-stripe-checkout";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = () => {
    return (
      <div>
        <h2>This section is to load products</h2>
        {products?.map((product, index) => (
          <Card
            key={index}
            product={product}
            removeFromCart={true}
            addtoCart={false}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };

  const loadCheckout = () => {
    if (products.length > 0) {
      return (
        <div>
          <h2>This section for checkout</h2>
          <StripeCheckout
            token={handlePaymentSuccess}
            stripeKey="pk_test_51LcQCpSC2hdbP7ek4oD5sWGKbEV7X8dBOL1x1vELbSTX3ZO79dhZP7v8EIPD7o8Mv5RKiBGhjsRR4yLOsv3xSSep00ilSmIbOf"
            name="Your Company Name"
            amount={calculateTotalAmount()} // Calculate the total amount to charge
          >
            <button className="btn btn-success">Proceed to Payment</button>
          </StripeCheckout>
        </div>
      );
    } else {
      return (
        <div>
          <h2>Your cart is empty</h2>
        </div>
      );
    }
  };

  const calculateTotalAmount = () => {
    // Calculate the total amount based on the products in the cart
    let total = 0;
    products.forEach((product) => {
      total += product.price;
    });
    return total * 100; // Stripe expects the amount in cents
  };

  const handlePaymentSuccess = (token) => {
    // Handle the payment success here, e.g., send the token to your server for processing
    console.log("Payment successful!",  token );
    
  };
  
  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center">
        <div className="col-6">{loadAllProducts()}</div>
        <div className="col-6">{loadCheckout()}</div>
      </div>
    </Base>
  );
};

export default Cart;
