import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./productdetails.scss";
import StoreDetails from "../storedetails/storedetails";
import SkeletonLoader from "../hooks/skeletonloader/skeletonloader";

interface Product {
  _id: string;
  title: string;
  name: string;
  description: string;
  image: string;
  price: number;
  mrp: number;
  discount: number;
  bankOffer?: number;
  bankname?: string;
  colorVariants?: string;
  textColor?: string;
  bgColor?: string;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isStoreOpen, setIsStoreOpen] = useState(false); // New state for modal

  useEffect(() => {
    axios.get(`https://vk-electronics-backend.onrender.com/products/product/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h2><SkeletonLoader variant="product" items={3} /></h2>;
  if (!product) return <h2>Product Not Found</h2>;

  return (
    <div className="product-details-page" style={{ backgroundColor: product.bgColor, color: product.textColor }}>
      <Link to="/" className="back-button">← Back</Link>
      <img src={product.image} alt={product.name || product.title} className="product-image" />
      <div className="details">
        <h2 className="product-title">{product.name ? product.name : product.title ? product.title : "Unnamed Product"}</h2>
        <p className="description">{product.description}</p>
        {product.price && (
          <p className="price">-{product.discount}% <span className="discount">₹{product.price}</span></p>
        )}
        {product.mrp && (
          <p className="product-mrp">M.R.P.: <span className="mrp-underline">₹{product.mrp}</span></p>
        )}
        <p className="bank-offer">
          {product.bankname} - ₹{product.bankOffer}
        </p>
        <button className="buy-now" onClick={() => setIsStoreOpen(true)}>Visit Store Now</button>
      </div>
      {/* Show StoreDetails Modal when isStoreOpen is true */}
      <StoreDetails isOpen={isStoreOpen} onClose={() => setIsStoreOpen(false)} />
    </div>

  );
};

export default ProductDetails;
