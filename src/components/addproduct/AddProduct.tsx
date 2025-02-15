import React, { useState } from "react";
import axios from "axios";
import "./addProduct.scss"; // Optional styling

const AddProduct: React.FC = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    textColor: "",
    bgColor: "",
    mrp: "",
    discount: "",
    title: "",
    bankname: "",
    bankOffer: "",
    category: "smartphone",
  });

  const [password, setPassword] = useState(""); // State to store password input
  const [isAuthorized, setIsAuthorized] = useState(false); // State to manage authorization status

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: name === "price" || name === "mrp" || name === "discount" || name === "bankOffer" ? Number(value) : value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "vivek") {
      setIsAuthorized(true);
    } else {
      alert("❌ Incorrect Password!");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("https://vk-electronics-backend.onrender.com/products", product);
      alert("✅ Product Added Successfully!");
      setProduct({
        name: "",
        description: "",
        price: "",
        image: "",
        textColor: "#000000",
        bgColor: "#ffffff",
        mrp: "",
        discount: "",
        title: "",
        bankname: "",
        bankOffer: "",
        category: "smartphone",
      });
    } catch (error) {
      console.error("Error adding product:", error);
      alert("❌ Failed to add product!");
    }
  };

  return (
    <div className="add-product-form">
      {!isAuthorized ? (
        <div>
          <h2>Enter Password to Access Product Form</h2>
          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Add a New Product</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required />
            <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange} required />
            <input type="text" name="price" placeholder="Price (₹)" value={product.price} onChange={handleChange} required />
            <input type="text" name="image" placeholder="Image URL" value={product.image} onChange={handleChange} />
            <input type="text" name="title" placeholder="Product Title" value={product.title} onChange={handleChange} />
            <input type="text" name="textColor" placeholder="Text Color (Hex)" value={product.textColor} onChange={handleChange} />
            <input type="text" name="bgColor" placeholder="Background Color (Hex)" value={product.bgColor} onChange={handleChange} />
            <input type="text" name="mrp" placeholder="MRP (₹)" value={product.mrp} onChange={handleChange} />
            <input type="text" name="discount" placeholder="Discount (%)" value={product.discount} onChange={handleChange} />
            <input type="text" name="bankname" placeholder="Bank Name (if any)" value={product.bankname} onChange={handleChange} />
            <input type="text" name="bankOffer" placeholder="Bank Offer (₹)" value={product.bankOffer} onChange={handleChange} />

            {/* Category Selection */}
            <select name="category" value={product.category} onChange={handleChange} className="category-selection" required>
              <option value="smartphone">Smartphone</option>
              <option value="electronics">Electronics</option>
              <option value="home-appliance">Home Appliance</option>
            </select>

            <button type="submit">Add Product</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
