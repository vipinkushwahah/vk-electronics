import React, { useState } from "react";
import axios from "axios";
import "./addProduct.scss"; // Optional styling

const AddProduct: React.FC = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("https://vk-electronics-backend.onrender.com/products", product);
      alert("✅ Product Added Successfully!");
      setProduct({ name: "", description: "", price: "", image: "" }); // Reset form
    } catch (error) {
      console.error("Error adding product:", error);
      alert("❌ Failed to add product!");
    }
  };

  return (
    <div className="add-product-form">
      <h2>Add a New Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price (₹)" value={product.price} onChange={handleChange} required />
        <input type="text" name="image" placeholder="Image URL" value={product.image} onChange={handleChange} required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
