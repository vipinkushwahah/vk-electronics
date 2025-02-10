import React from "react";
import "./product.scss";
import { Link } from "react-router-dom";

interface Product {
    id: number;
    title: string;
    image: string;
    //   rating: number;
    //   reviews: number;
    //   bought: string;
    price: number;
    mrp: number;
    discount: number;
    bankOffer: number;
    //   deliveryDate: string;
    //   fastestDelivery: string;
    colorVariants: string;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div>
            <Link to={`/product/${product.id}`} className="product-link">
                <div className="product-card">
                    <img src={product.image} alt={product.title} className="product-image" />
                    <div className="product-details">
                        <div className="product-title">{product.title}</div>
                        <div className="rating">
                            {/* <span className="stars">⭐ {product.rating}</span> */}
                            {/* <span className="reviews">({product.reviews})</span> */}
                        </div>
                        {/* <p className="bought">{product.bought} bought in past month</p> */}
                        <div className="price">
                            ₹{product.price} <span className="mrp">M.R.P: ₹{product.mrp}</span>{" "}
                            <span className="discount">({product.discount}% off)</span>
                        </div>
                        <div className="bank-offer">Buy for ₹{product.bankOffer} with HDFC Bank</div>
                        <div className="delivery">
                            {/* 📦 Free delivery <strong>{product.deliveryDate}</strong> or fastest delivery{" "} */}
                            {/* <strong>{product.fastestDelivery}</strong> */}
                        </div>
                        <div className="variants">{product.colorVariants}</div>
                        <button className="add-to-cart">See Product Details</button>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
