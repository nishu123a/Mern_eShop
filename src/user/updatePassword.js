import React, { useState } from "react";
import Base from "../core/Base";
import { resetPassword } from "./helper/userapicalls";

const PasswordResetRequest = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    resetPassword(email)
      .then((data) => {
        if (data&&data.error) {
          setMessage(data.error);
        } else {
          setMessage(data.message);
        }
      });
  };

  return (
    <Base title="Password Reset Request" description="Enter your email to reset your password">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Request Password Reset
              </button>
            </form>
            <p>{message}</p>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default PasswordResetRequest;
