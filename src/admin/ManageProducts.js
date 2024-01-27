import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getProducts, deleteProduct ,updateProduct} from "./helper/adminapicall";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching products from an API
    // In a real application, you would make an API request here
    setTimeout(() => {
      const sampleProducts = [
        { _id: 1, name: "Product 1" },
        { _id: 2, name: "Product 2" },
        { _id: 3, name: "Product 3" },
      ];
      setProducts(sampleProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const deleteProduct = (productId) => {
    // Simulate a delete operation
    // In a real application, you would make an API request to delete the product
    const updatedProducts = products.filter((product) => product._id !== productId);
    setProducts(updatedProducts);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Manage Products</h2>
      <Link to="/admin/dashboard" className="btn btn-info">
        Admin Home
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>
                <Link to={`/admin/product/update/${product._id}`} className="btn btn-success">
                  Update
                </Link>
                <button onClick={() => deleteProduct(product._id)} className="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
