import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./homeappliance.scss";
import SkeletonLoader from "../hooks/skeletonloader/skeletonloader";
import { Helmet } from "react-helmet-async";

interface Appliance {
    _id: string;
    name: string;
    description: string;
    image?: string; // URL image
    images?: Array<{ data: string }>; // Base64 encoded image(s)
    price: number;
    mrp: number;
    discount: number;
    textColor?: string;
    bgColor?: string;
}

const HomeAppliances: React.FC = () => {
    const [appliances, setAppliances] = useState<Appliance[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        fetchAppliances();
    }, []);

    const fetchAppliances = async () => {
        try {
            const response = await axios.get("https://vk-electronics-backend.onrender.com/products/home-appliance");
            setAppliances(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching appliances:", error);
            setError("Failed to load appliances. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="home-appliances">
            <Helmet>
                <title>Home Appliances - VK Electronics</title>
                <meta name="description" content="Shop the latest home appliances at VK Electronics. Get great deals on kitchen and home essentials!" />
                <meta name="keywords" content="home appliances, kitchen appliances, electronics, best deals, online shopping" />
                <meta property="og:title" content="Home Appliances - VK Electronics" />
                <meta property="og:description" content="Explore a wide range of high-quality home appliances at VK Electronics. Shop now!" />
                <meta property="og:image" content="https://vk-electronics.netlify.app/default-home-appliance-image.jpg" />
                <meta property="og:url" content="https://vk-electronics.netlify.app/home-appliance" />
            </Helmet>

            <h2 className="title">Home Appliances</h2>
            {loading && <SkeletonLoader variant="gadget" items={6} />}
            {error && <p className="error">{error}</p>}

            <div className="appliance-list">
                {appliances.map((appliance) => {
                    // Determine image source
                    const imageSrc = appliance.image || (appliance.images && appliance.images[0]?.data) || "";

                    return (
                        <div
                            key={appliance._id}
                            className="appliance-card"
                            style={{ backgroundColor: appliance.bgColor, color: appliance.textColor }}
                        >
                            {imageSrc ? (
                                <img src={imageSrc} alt={appliance.name} className="appliance-image" />
                            ) : (
                                <div className="no-image">No image available</div>
                            )}
                            <div className="appliance-name">{appliance.name}</div>
                            <p className="appliance-description">{appliance.description}</p>
                            <div className=" appliance-price">
                            ₹{appliance.price} <span className="appliance-mrp">M.R.P: ₹{appliance.mrp}</span>
                            <span className="appliance-discount">({appliance.discount}% off)</span>
                            </div>
                            <Link to={`/product/${appliance._id}`}>
                                <button className="add-to-cart-product">See Product Details</button>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HomeAppliances;
