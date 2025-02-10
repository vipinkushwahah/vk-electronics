import React from "react";
import {  useParams } from "react-router-dom";
import "./productdetails.scss";

interface Product {
  id: number;
  title: string;
  image: string;
  rating: number;
  reviews: number;
  bought: string;
  price: number;
  mrp: number;
  discount: number;
  bankOffer: any;
  bankName: string;
  deliveryDate: string;
  fastestDelivery: string;
  colorVariants: string;
  description: string;
}

// Sample data (Replace with API data if needed)
const products: Product[] = [
  {
    id: 1,
    title: "iQOO Z9x 5G (Tornado Green, 4GB RAM, 128GB Storage)",
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQZUrx_V0FC1WCf2uiFYf72CeWzzsea9WMlNv_yQfHi8xV-C29VWuq3dZtKtmu8sAoObGRMcj9sGNXAN3XsPZxbB_JYrh8J2KGAT1hOUD8li-yXjHzVUsefKg",
    rating: 4.2,
    reviews: 6107,
    bought: "2K+",
    price: 11999,
    mrp: 17999,
    discount: 33,
    bankOffer: 1099,
    bankName: "HDFC Credit Card",
    deliveryDate: "Wed, 12 Feb",
    fastestDelivery: "Tue, 11 Feb",
    colorVariants: "+1 other color/pattern",
    description:
      "The iQOO Z9x 5G comes with a powerful Snapdragon 6 Gen 1 processor, a 5600mAh battery, and a stunning 120Hz display.",
  },
  {
    id: 2,
    title: "iQOO Z9 Lite 5G (Mocha Brown, 4GB RAM, 128GB Storage)",
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQZUrx_V0FC1WCf2uiFYf72CeWzzsea9WMlNv_yQfHi8xV-C29VWuq3dZtKtmu8sAoObGRMcj9sGNXAN3XsPZxbB_JYrh8J2KGAT1hOUD8li-yXjHzVUsefKg",
    rating: 4.0,
    reviews: 3191,
    bought: "4K+",
    price: 10499,
    mrp: 14499,
    discount: 28,
    bankOffer: "₹999",
    bankName: "ICIC Credit Card",
    deliveryDate: "Wed, 12 Feb",
    fastestDelivery: "Tomorrow, 10 Feb",
    colorVariants: "+1 other color/pattern",
    description:
      "iQOO Z9 Lite 5G features a Dimensity 6300 processor with a 50MP AI camera and long-lasting 5000mAh battery.",
  },
];

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get product ID from URL
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <h2>Product Not Found</h2>;
  }

  return (
    <div>
      <div className="back-button">
       Product Details
      </div>
      <div className="product-details-page">
        <img src={product.image} alt={product.title} className="product-image" />
        <div className="details">
          <div className="product-title">{product.title}</div>
          <div className="description">{product.description}</div>
          <div className="price">  -{product.discount}% <span className="discount"> ₹{product.price}</span></div>
          <div className="product-mrp">M.R.P. : <span className="mrp-underline">₹{product.mrp}</span></div>
          <div className="bank-offer"> {product.bankName} -₹{product.bankOffer}</div>
          {/* <div className="delivery">Delivery by {product.deliveryDate}</div> */}
          <button className="buy-now">Visit Store Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
