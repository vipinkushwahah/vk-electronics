import React from "react";
import "./product.scss";
import { Link } from "react-router-dom";

interface Product {
    _id: string;
    title: string;
    description: string;
    image?: string; // URL image
    images?: Array<{ data: string }>; // Base64 encoded image(s)
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
    // Handle image source (either URL or base64)
    const imageSrc = product.image || (product.images && product.images[0]?.data) || "/default-image.png"; // Default image if no image is provided

    return (
        <div style={{ backgroundColor: product.bgColor || "#ffffff", color: product.textColor || "#000000" }} className="product-card">
            <img
                src={imageSrc}
                alt={product.title}
                className="product-image"
                onError={(e) => (e.target as HTMLImageElement).src = "/default-image.png"} // Handle image loading errors (fallback to default)
            />

            <div className="product-details">
                <div className="product-title">{product.title}</div>

                <div className="price">
                    ₹{product.price} <span className="mrp">M.R.P: ₹{product.mrp}</span>{" "}
                    <span className="discount">({product.discount}% off)</span>
                </div>

                {product.bankOffer && product.bankname && (
                    <div className="bank-offer">
                        Buy for ₹{product.bankOffer} with {product.bankname}
                    </div>
                )}

                {product.colorVariants && (
                    <div className="variants">+1 other color/pattern</div>
                )}

                <Link key={product._id} to={`/product/${product._id}`} className="product-link">
                    <button className="add-to-cart">See Product Details</button>
                </Link>
            </div>
        </div>
    );
};


export default ProductCard;
