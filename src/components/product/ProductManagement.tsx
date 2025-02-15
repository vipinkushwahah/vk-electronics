import React, { useState, useEffect } from "react";
import axios from "axios";
import "./productManagement.scss";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  textColor?: string;
  bgColor?: string;
}

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Product>({
    _id: "",
    name: "",
    description: "",
    price: 0,
    image: "",
    textColor: "#000000",
    bgColor: "#ffffff",
  });
  
  const [password, setPassword] = useState(""); // Password input state
  const [isAuthorized, setIsAuthorized] = useState(false); // Authorization state

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://vk-electronics-backend.onrender.com/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      await axios.put(`https://vk-electronics-backend.onrender.com/products/${editingProduct._id}`, newProduct);
      setEditingProduct(null);
    } else {
      await axios.post("https://vk-electronics-backend.onrender.com/products", newProduct);
    }
    fetchProducts();
    setNewProduct({ _id: "", name: "", description: "", price: 0, image: "", textColor: "#000000", bgColor: "#ffffff" });
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setNewProduct(product);
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`https://vk-electronics-backend.onrender.com/products/${id}`);
    fetchProducts();
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

  return (
    <div className="product-management">
      {!isAuthorized ? (
        <div>
          <h2>Enter Password to Access Product Management</h2>
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
        <>
          <h2>{editingProduct ? "Edit Product" : "Add Product"}</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Product Name" value={newProduct.name} onChange={handleChange} required />
            <textarea name="description" placeholder="Description" value={newProduct.description} onChange={handleChange} required />
            <input type="number" name="price" placeholder="Price (₹)" value={newProduct.price} onChange={handleChange} required />
            <input type="text" name="image" placeholder="Image URL" value={newProduct.image} onChange={handleChange} required />
            <label>Text Color: </label>
            <input type="color" name="textColor" value={newProduct.textColor} onChange={handleChange} />
            <label>Background Color: </label>
            <input type="color" name="bgColor" value={newProduct.bgColor} onChange={handleChange} />
            <button type="submit">{editingProduct ? "Update Product" : "Add Product"}</button>
          </form>

          <h2>Manage Products</h2>
          <div className="product-list">
            {products.map((product) => (
              <div
                key={product._id}
                className="product-card-list"
                style={{ backgroundColor: product.bgColor, color: product.textColor }}
              >
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: ₹{product.price}</p>
                <button onClick={() => handleEdit(product)}>✏ Edit</button>
                <button onClick={() => handleDelete(product._id)}>🗑 Delete</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductManagement;
