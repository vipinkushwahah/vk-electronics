import React from "react";
import { Link } from "react-router-dom";
import "./ourproduct.scss";

interface OurProduct {
    id: number;
    name: string;
    description: string;
    route: string; // Added route for navigation
    image?: string; 
    icon?: string;
}

const OurProductss: OurProduct[] = [
    {
        id: 1,
        name: "Smartphone / Keypad Phones",
        description: "We provide all smartphone brands, including headphones, wireless Bluetooth, and more.",
        route: "smartphone",
        image: "📱",
    },
    {
        id: 2,
        name: "Electronic Gadgets",
        description: "We have a variety of electronic gadgets at wholesale price. Click to check.",
        route: "electronics",
        icon: "ri-customer-service-fill",
    },
    {
        id: 3,
        name: "Home Appliances",
        description: "We provide home appliances with home service repair and much more. Click to check.",
        route: "homeappliences",
        icon: "ri-home-gear-fill",
    },
];

const OurProducts: React.FC = () => {
    return (
        <div className="repair-services">
            <h2 className="title">Our Products</h2>
            <p className="subtitle">We provide all kinds of repair services for smartphones, gadgets, and home appliances.</p>
            
            <ul className="product-links">
                <li><Link to="/smartphone">SmartPhone</Link></li>
                <li><Link to="/electronics">Electronics</Link></li>
                <li><Link to="/homeappliences">Home Appliances</Link></li>
            </ul>

            <div className="service-list">
                {OurProductss.map((product) => (
                    <Link to={`/${product.route}`} key={product.id} className="service-card">
                        <div className={`icon ${product.icon || ""} `}>
                            {product.image?.startsWith("/") ? (
                                <img src={product.image} alt={product.name} />
                            ) : (
                                product.image
                            )}
                        </div>
                        <div className="service-name">{product.name}</div>
                        <div>{product.description}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default OurProducts;
