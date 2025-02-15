import React from "react";
import "./product.scss";
import { Link } from "react-router-dom";

interface Product {
    _id: string;
    title: string;
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

interface ProductCardProps {
    product: Product;
    onDelete: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        
        <div style={{ backgroundColor: product.bgColor, color: product.textColor }} className="product-card">
            
                {/* <div> */}
                    <img src={product.image} alt={product.title} className="product-image" />
                {/* </div> */}
                <div className="product-details">
                    <div className="product-title">{product.title}</div>
                    <div className="price">
                        ₹{product.price} <span className="mrp">M.R.P: ₹{product.mrp}</span>{" "}
                        <span className="discount">({product.discount}% off)</span>
                    </div>
                    <div className="bank-offer">Buy for ₹{product.bankOffer} with {product.bankname}</div>
                    <div className="variants">+1 other color/pattern</div>
                    <Link key={product._id} to={`/product/${product._id}`} className="product-link">
                    <button className="add-to-cart">See Product Details</button>
                    </Link>
                    {/* <div className="product-actions">
                        <button className="edit-button">✏ Edit</button>
                        <button className="delete-button" onClick={() => onDelete(product._id)}>🗑 Delete</button>
                    </div> */}
                </div>

        </div>
       
    );
};

export default ProductCard;
