import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles.css";
import Base from "../core/Base";
import { getUser } from "../core/helper/coreapicalls";
import { isAutheticated } from "../auth/helper";

const UserDashboard = () => {
  const [User, setUsers] = useState();
  const [reload, setReload] = useState(false);
  const { user } = isAutheticated();

  return (
    <Base title="User Page" description="">
      <div className="row text-center">
        <div className="col-6">
          <h3>{user.name}</h3>
          <h3>{user.email}</h3><br/><br/>
          <Link to="/update-password">
            <button className="btn btn-primary">Update Password</button>
          </Link>
        </div>
        <div className="col-6">
          <Link to="/order">
            <button className="btn btn-success">Order History</button>
          </Link>
        </div>
      </div>
    </Base>
  );
};

export default UserDashboard;
