import React, { useState, useEffect } from "react";
import axios from "axios";
import "./productManagement.scss";
import SkeletonLoader from "../hooks/skeletonloader/skeletonloader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: string;
  images: (string | File)[]; // Supports both existing and new images
  textColor?: string;
  bgColor?: string;
  createdBy?: string; // Added to track product owner
  mrp?: string;
  discount?: string;
  title?: string;
  bankname?: string;
  bankOffer?: string;
  category?: string;
}

interface User {
  userId: string;
  username: string;
  isShopkeeper: boolean;
}

const ProductManagement: React.FC<{ user: User | null }> = ({ user }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Product>({
    _id: "",
    name: "",
    description: "",
    price: "",
    images: [],
    textColor: "#000000",
    bgColor: "#ffffff",
    mrp: "",
    discount: "",
    title: "",
    bankname: "",
    bankOffer: "",
    category: "smartphone",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (user?.isShopkeeper) {
      fetchProducts();
    }
  }, [user]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://vk-electronics-backend.onrender.com/products", {
        params: { createdBy: user?.userId }
      });
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
  
    // Append product data
    for (const key in newProduct) {
      if (key !== "images" && key !== "_id") {
        formData.append(key, String(newProduct[key as keyof Product]));
      }
    }
  
    // Append only new image files
    newProduct.images.forEach((image) => {
      if (image instanceof File) {
        formData.append("images", image);
      }
    });

    // Add shopkeeper ID to the product
    if (user?.userId) {
      formData.append("createdBy", user.userId);
    }
  
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
      setNewProduct({ 
        _id: "", 
        name: "", 
        description: "", 
        price: "", 
        images: [], 
        textColor: "#000000", 
        bgColor: "#ffffff",
        mrp: "",
        discount: "",
        title: "",
        bankname: "",
        bankOffer: "",
        category: "smartphone",
      });
      toast.success(editingProduct ? "Product updated successfully!" : "Product added successfully!");
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };  

  const handleEdit = (product: Product) => {
    // Verify the product belongs to the current shopkeeper
    console.log("Product createdBy:", product.createdBy);
    console.log("Current user ID:", user?.userId);
    if (product.createdBy === user?.userId) {
      setEditingProduct(product);
      setNewProduct({
        ...product,
        images: product.images.map(img => typeof img === 'string' ? img : URL.createObjectURL(img))
      });
    } else {
      toast.error("You can only edit your own products.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const productToDelete = products.find(p => p._id === id);
      console.log("Product to delete createdBy:", productToDelete?.createdBy);
      console.log("Current user ID:", user?.userId);
      if (productToDelete?.createdBy !== user?.userId) {
        toast.error("You can only delete your own products.");
        return;
      }

      await axios.delete(`https://vk-electronics-backend.onrender.com/products/${id}`);
      toast.success("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product. Please try again.");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "vivek") {
      setIsAuthorized(true);
    } else {
      toast.error("❌ Incorrect Password!");
    }
  };

  if (!user?.isShopkeeper) {
    return (
      <div className="product-management">
        <h2>Shopkeeper Access Required</h2>
        <p>You need to be logged in as a shopkeeper to access this page.</p>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="product-management">
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
    );
  }

  return (
    <div className="product-management">
      <h2>{editingProduct ? "Edit Product" : "Add Product"}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Product Name" value={newProduct.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={newProduct.description} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price (₹)" value={newProduct.price} onChange={handleChange} required />
        <input type="text" name="mrp" placeholder="MRP (₹)" value={newProduct.mrp} onChange={handleChange} />
        <input type="text" name="discount" placeholder="Discount (%)" value={newProduct.discount} onChange={handleChange} />
        <input type="text" name="title" placeholder="Product Title" value={newProduct.title} onChange={handleChange} />
        <input type="text" name="bankname" placeholder="Bank Name" value={newProduct.bankname} onChange={handleChange} />
        <input type="text" name="bankOffer" placeholder="Bank Offer (₹)" value={newProduct.bankOffer} onChange={handleChange} />

        <label>Text Color: </label>
        <input type="color" name="textColor" value={newProduct.textColor} onChange={handleChange} />
        
        <label>Background Color: </label>
        <input type="color" name="bgColor" value={newProduct.bgColor} onChange={handleChange} />
        
        <label>Upload Images:</label>
        <input type="file" multiple accept="image/*" onChange={handleImageChange} />

        {newProduct.images.length > 0 && (
          <div className="image-previewe">
            <h3>Image Preview:</h3>
            <div className="preview-imagess">
              {newProduct.images.map((image, index) => (
                <div key={index} className="preview-imagee">
                  <img
                    src={image instanceof File ? URL.createObjectURL(image) : image}
                    alt={`Image ${index + 1}`}
                    className="image-thumb"
                  />
                  <button type="button" onClick={() => handleImageRemove(index)}>Remove</button>
                </div>
              ))}
            </div>
          </div>
        )}
<select name="category" value={newProduct.category} onChange={handleChange} className="category-selection" required>
          <option value="smartphone">Smartphone</option>
          <option value="electronics">Electronics</option>
          <option value="home-appliance">Home Appliance</option>
        </select>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Processing..." : editingProduct ? "Update Product" : "Add Product"}
        </button>
        {editingProduct && (
          <button type="button" onClick={() => {
            setEditingProduct(null);
            setNewProduct({ 
              _id: "", 
              name: "", 
              description: "", 
              price: "", 
              images: [], 
              textColor: "#000000", 
              bgColor: "#ffffff",
              mrp: "",
              discount: "",
              title: "",
              bankname: "",
              bankOffer: "",
              category: "smartphone",
            });
          }}>
            Cancel
          </button>
        )}
      </form>

      <h2>Your Products</h2>
      {loading && <SkeletonLoader variant="gadget" items={4} />}
      <div className="product-list">
        {products.length === 0 && !loading ? (
          <p>No products found. Add your first product above.</p>
        ) : (
          products.map((product) => (
            <div 
              key={product._id} 
              className="product-card-list" 
              style={{ backgroundColor: product.bgColor, color: product.textColor }}
            >
              {product.images.length > 0 && (
                <img 
                  src={`data:image/jpeg;base64,${product.images[0]}`} 
                  alt={product.name} 
                />
              )}
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ₹{product.price}</p>
              {product.mrp && <p>MRP: ₹{product.mrp}</p>}
              {product.discount && <p>Discount: {product.discount}%</p>}
              {product.bankOffer && <p>Bank Offer: ₹{product.bankOffer}</p>}
              <button onClick={() => handleEdit(product)}>✏ Edit</button>
              <button onClick={() => handleDelete(product._id)}>🗑 Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductManagement;
