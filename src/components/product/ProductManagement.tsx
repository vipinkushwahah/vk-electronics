import React, { useState, useEffect } from "react";
import axios from "axios";
import "./productManagement.scss";
import SkeletonLoader from "../hooks/skeletonloader/skeletonloader";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: (string | File)[]; // Supports both existing and new images
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
    images: [],
    textColor: "#000000",
    bgColor: "#ffffff",
  });

  const [password, setPassword] = useState(""); // Password input state
  const [isAuthorized, setIsAuthorized] = useState(false); // Authorization state
  const [isLoading, setIsLoading] = useState(false); // Loading state for API calls
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://vk-electronics-backend.onrender.com/products");
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setNewProduct({ ...newProduct, images: [...newProduct.images, ...Array.from(files)] });
    }
  };

  const handleImageRemove = (index: number) => {
    setNewProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index) as (string | File)[], // Explicitly cast to prevent TypeScript errors
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    const formData = new FormData();
  
    // Append product data dynamically (excluding images)
    for (const key in newProduct) {
      if (key !== "images") {
        formData.append(key, String(newProduct[key as keyof Product]));
      }
    }
  
    // Append only new image files (ignore existing image URLs)
    newProduct.images.forEach((image) => {
      if (image instanceof File) {
        formData.append("images", image);
      }
    });
  
    try {
      if (editingProduct) {
        await axios.put(
          `https://vk-electronics-backend.onrender.com/products/${editingProduct._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setEditingProduct(null);
      } else {
        await axios.post("https://vk-electronics-backend.onrender.com/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
  
      fetchProducts();
      setNewProduct({ _id: "", name: "", description: "", price: 0, images: [], textColor: "#000000", bgColor: "#ffffff" });
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setIsLoading(false);
    }
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
            <input type="password" placeholder="Enter Password" value={password} onChange={handlePasswordChange} required />
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
            
            <label>Upload Images:</label>
            <input type="file" multiple accept="image/*" onChange={handleImageChange} />

            {/* Image Preview Section */}
            {newProduct.images.length > 0 && (
              <div className="image-previewe">
                <h3>Image Preview:</h3>
                <div className="preview-imagess">
                  {newProduct.images.map((image, index) => (
                    <div key={index} className="preview-imagee">
                      <img
                        src={image instanceof File ? URL.createObjectURL(image) : `data:image/jpeg;base64,${image}`}
                        alt={`Image ${index + 1}`}
                        className="image-thumb"
                      />
                      <button type="button" onClick={() => handleImageRemove(index)}>Remove</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <label>Text Color: </label>
            <input type="color" name="textColor" value={newProduct.textColor} onChange={handleChange} />
            <label>Background Color: </label>
            <input type="color" name="bgColor" value={newProduct.bgColor} onChange={handleChange} />
            <button type="submit" disabled={isLoading}>{isLoading ? "Processing..." : editingProduct ? "Update Product" : "Add Product"}</button>
          </form>

          <h2>Manage Products</h2>
          {loading && <SkeletonLoader variant="gadget" items={4} />}
          <div className="product-list">
            {products.map((product) => (
              <div key={product._id} className="product-card-list" style={{ backgroundColor: product.bgColor, color: product.textColor }}>
                {product.images.length > 0 && <img src={`data:image/jpeg;base64,${product.images[0]}`} alt={product.name} />}
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
