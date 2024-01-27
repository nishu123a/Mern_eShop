import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createOrder } from "./helper/coreapicalls"; // You should create this helper function

const CreateOrder = () => {
  const [order, setOrder] = useState({
    products: [],
    address: "",
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAutheticated();

  // Assume you have a cartItems state to manage the products in the cart
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from localStorage when the component mounts
  useEffect(() => {
    if (localStorage.getItem("cart")) {
      setCartItems(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to="/user/dashboard">
        User Home
      </Link>
    </div>
  );

  const handleChange = (event) => {
    setError("");
    setOrder({
      ...order,
      address: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    // Merge cart items with the order's products
    const orderWithProducts = {
      ...order,
      products: cartItems,
    };

    // Backend request to create an order
    createOrder(user._id, token, orderWithProducts).then((data) => {
      if (data && data.error) {
        setError(true);
      } else {
        setError(false);
        setSuccess(true);

        // Clear the cart items from localStorage after the order is created
        localStorage.removeItem("cart");

        //setOrder({ products: [], address: "" });
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Order created successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-danger">Failed to create the order</h4>;
    }
  };

  const myOrderForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the shipping address</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange}
          value={order.address}
          autoFocus
          required
          placeholder="Shipping Address"
        />
        {/* Display the products in the cart */}
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
        <button onClick={onSubmit} className="btn btn-outline-info">
          Create Order
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Create an order here"
      description="Review products and add a shipping address for your order"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myOrderForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default CreateOrder;
