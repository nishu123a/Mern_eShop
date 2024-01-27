import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { getCategories, updateCategory, deleteCategory } from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper/index";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, token } = isAutheticated();

  const preload = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const handleChange = event => {
    setError("");
    setName(event.target.value);
  };

  const onUpdate = () => {
    setError("");
    setSuccess(false);
  
    updateCategory(categoryId, user._id, token,  {name} )
      .then(data => {
        if (data && data.error) {
          setError(data.error);
        } else {
          setError("");
          setSuccess(true);
          preload(); // Reload categories after a successful update
        }
      })
      
  };
  

  const onDelete = () => {
    setError("");

    deleteCategory(categoryId, user._id, token).then(data => {
      if (data&&data.error) {
        setError(data.error);
      } else {
    
        preload(); // Reload categories after successful deletion
      }
    });
  };

  
  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: success ? "" : "none" }}
          >
          
          </div>
        </div>
      </div>
    );
  };



  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <Base title="Manage Categories" description="Manage your product categories here">
      <div className="row">
        <div className="col-6">
          <h2 className="mb-4">All Categories:</h2>

          <ul className="list-group">
            {categories.map(category => (
              <li
                key={category._id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {category.name}
                <button
                  className="btn btn-info"
                  onClick={() => {
                    setName(category.name);
                    setCategoryId(category._id);
                  }}
                >
                  Update
                </button>
                <button className="btn btn-danger" onClick={() => onDelete(category._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-6">
          {successMessage()}
          {errorMessage()}
          <h2 className="mb-4">Update Category:</h2>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              onChange={handleChange}
              value={name}
            />
          </div>
          <button className="btn btn-outline-info" onClick={onUpdate}>
            Update
          </button>
        </div>
      </div>
    </Base>
  );
};

export default ManageCategories;
