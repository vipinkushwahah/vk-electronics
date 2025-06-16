import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./addProduct.scss"; // Optional styling

interface Product {
  name: string;
  description: string;
  price: string;
  images: File[];  // Explicitly set images as File[] type
  textColor: string;
  bgColor: string;
  mrp: string;
  discount: string;
  title: string;
  bankname: string;
  bankOffer: string;
  category: string;
}

const AddProduct: React.FC = () => {
  const [product, setProduct] = useState<Product>({
    name: "",
    description: "",
    price: "",
    images: [], // This is now explicitly a File[] array
    textColor: "#000000",
    bgColor: "#ffffff",
    mrp: "",
    discount: "",
    title: "",
    bankname: "",
    bankOffer: "",
    category: "smartphone",
  });

  const [password, setPassword] = useState(""); // State to store password input
  const [isAuthorized, setIsAuthorized] = useState(false); // State to manage authorization status
  const [isLoading, setIsLoading] = useState(false); // State for loading status

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: name === "price" || name === "mrp" || name === "discount" || name === "bankOffer" ? value : value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "vivek") {
      setIsAuthorized(true);
    } else {
      toast("❌ Incorrect Password!");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setProduct({ ...product, images: Array.from(files) });  // This will now accept File[] because the state is typed properly
    }
  };

  const handleImageRemove = (index: number) => {
    const updatedImages = product.images.filter((_, i) => i !== index);
    setProduct({ ...product, images: updatedImages });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    const formData = new FormData();
    // Append product data to FormData
    for (const key in product) {
      if (key !== "images") {
        formData.append(key, product[key as keyof Product] as string); // Type-safe access to product fields
      }
    }

    // Append images to FormData
    product.images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      await axios.post("https://vk-electronics-backend.onrender.com/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast("✅ Product Added Successfully!");
      setProduct({
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
    } catch (error) {
      console.error("Error adding product:", error);
      toast("❌ Failed to add product!");
    } finally {
      setIsLoading(false); // Stop loading after the process
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
            <button className="button" type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Add a New Product</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required />
            <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange} required />
            <input type="text" name="price" placeholder="Price (₹)" value={product.price} onChange={handleChange} required />
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
            
            {/* Image Preview */}
            {product.images.length > 0 && (
              <div className="image-previewe">
                <h3>Image Preview:</h3>
                <div className="preview-imagess">
                  {product.images.map((image, index) => (
                    <div key={index} className="preview-imagee">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Image ${index + 1}`}
                        className="image-thumb"
                      />
                      <button  type="button" onClick={() => handleImageRemove(index)} className="remove-image">
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

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

            <button className="button" type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="loader"></div> // Circular loader
              ) : (
                "Add Product"
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
