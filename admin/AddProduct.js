import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { getCategories, createaProduct } from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper/index";

const AddProduct = () => {
  const { user, token } = isAutheticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: new FormData(),
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData,
  } = values;

  const preload = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createaProduct(user._id, token, formData)
      .then(data => {
        if (data && data.error) {
          setValues({ ...values, error: data.error });
        } else if(data && data.name) {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            stock: "",
            photo: "",
            loading: false,
            createdProduct: data.name,
          });
        }
      })
      .catch(err => console.log("Error in creating product: ", err));
  };

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdProduct ? "" : "none" }}
    >
      {createdProduct} created successfully!
    </div>
  );

  const errorMessage = () => (
    <div
      className="alert alert-danger mt-3"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className="container bg-info p-4"
    >
      {successMessage()}
      {errorMessage()}
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          <form>
            <span>Post photo</span>
            <div className="form-group">
              <label className="btn btn-block btn-success">
                <input
                  onChange={handleChange("photo")}
                  type="file"
                  name="photo"
                  accept="image/*"
                  placeholder="choose a file"
                />
              </label>
            </div>
            <div className="form-group">
              <input
                onChange={handleChange("name")}
                className="form-control"
                placeholder="Name"
                value={name}
              />
            </div>
            <div className="form-group">
              <textarea
                onChange={handleChange("description")}
                className="form-control"
                placeholder="Description"
                value={description}
              />
            </div>
            <div className="form-group">
              <input
                onChange={handleChange("price")}
                type="number"
                className="form-control"
                placeholder="Price"
                value={price}
              />
            </div>
            <div className="form-group">
              <select
                onChange={handleChange("category")}
                className="form-control"
                placeholder="Category"
              >
                <option>Select</option>
                {categories &&
                  categories.map((cate, index) => (
                    <option key={index} value={cate._id}>
                      {cate.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group">
              <input
                onChange={handleChange("stock")}
                type="number"
                className="form-control"
                placeholder="Stock"
                value={stock}
              />
            </div>

            <button
              type="submit"
              onClick={onSubmit}
              className="btn btn-outline-success mb-3"
            >
              Create Product
            </button>
          </form>
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
