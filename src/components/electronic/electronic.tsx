import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./electronic.scss";
import { Helmet } from "react-helmet-async";
import SkeletonLoader from "../hooks/skeletonloader/skeletonloader";

interface Gadget {
    _id: string;
    name: string;
    description: string;
    image?: string;
    textColor?: string;
    bgColor?: string;
}

const ElectronicGadgets: React.FC = () => {
    const [gadgets, setGadgets] = useState<Gadget[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        fetchGadgets();
    }, []);

    const fetchGadgets = async () => {
        try {
            const response = await axios.get("https://vk-electronics-backend.onrender.com/products/electronics");
            setGadgets(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching gadgets:", error);
            setError("Failed to load gadgets. Please try again.");
            setLoading(false);
        }
    };

    // const handleDelete = async (id: string) => {
    //     try {
    //         await axios.delete(`https://vk-electronics-backend.onrender.com/products/${id}`);
    //         fetchGadgets();
    //     } catch (error) {
    //         console.error("Error deleting gadget:", error);
    //     }
    // };

    return (
        <div className="electronic-gadgets">
             
             <Helmet>
                <title>Electronic Gadgets - VK Electronics</title>
                <meta name="description" content="Browse the latest electronic gadgets at VK Electronics. Shop now for the best deals!" />
                <meta name="keywords" content="electronics, gadgets, smart devices, online shopping" />
                <meta property="og:title" content="Electronic Gadgets - VK Electronics" />
                <meta property="og:description" content="Find the latest electronic gadgets with great discounts at VK Electronics." />
                <meta property="og:image" content="https://vk-electronics.netlify.app/default-gadget-image.jpg" />
                <meta property="og:url" content="https://vk-electronics.netlify.app/electronics" />
            </Helmet>

            <h2 className="title">Electronic Gadgets</h2>
            {loading && <SkeletonLoader variant="gadget" items={6} />}
            {error && <p className="error">{error}</p>}

            <div className="gadget-list">
                {gadgets.map((gadget) => (
                    <div
                        key={gadget._id}
                        className="gadget-card"
                        style={{ backgroundColor: gadget.bgColor, color: gadget.textColor }}
                    >

                        <img src={gadget.image} alt={gadget.name} className="gadget-image" />
                        <div className="gadget-name">{gadget.name}</div>
                        <p className="gadget-description">{gadget.description}</p>

                        <Link to={`/product/${gadget._id}`}>
                            <button className="add-to-cart-product">See Product Details</button>
                        </Link>
                        {/* <div className="actions">
                            <button className="edit-button">✏ Edit</button>
                            <button className="delete-button" onClick={() => handleDelete(gadget._id)}>🗑 Delete</button>
                        </div> */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ElectronicGadgets;
