import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ourproduct.scss";

interface Product {
  _id: string;
  name: string;
  description: string;
  route: string;
  image?: string;
  icon?: string;
  price?: number;
}

const OurProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get("https://vk-electronics-backend.onrender.com/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="repair-services">
      <h2 className="title">Our Products</h2>
      <p className="subtitle">We provide all kinds of electronic gadgets, smartphones, and home appliances.</p>
      
      <ul className="product-links">
        <li><Link to="/smartphone">SmartPhone</Link></li>
        <li><Link to="/electronics">Electronics</Link></li>
        <li><Link to="/homeappliences">Home Appliances</Link></li>
      </ul>

      <div className="service-list">
        {products.map((product) => (
          <Link to={`/${product.route}`} key={product._id} className="service-card">
            <div className={`icon ${product.icon || ""}`}>
              {product.image ? (
                <img src={product.image} alt={product.name} />
              ) : (
                product.icon || "🛒"
              )}
            </div>
            <div className="service-name">{product.name}</div>
            <div>{product.description}</div>
            {product.price && <div className="price">Price: ₹{product.price}</div>}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OurProducts;
