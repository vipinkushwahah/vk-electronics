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
    image?: string;
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

    // const handleDelete = async (id: string) => {
    //     try {
    //         await axios.delete(`https://vk-electronics-backend.onrender.com/products/${id}`);
    //         fetchAppliances();
    //     } catch (error) {
    //         console.error("Error deleting appliance:", error);
    //     }
    // };

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
                {appliances.map((appliance) => (
                    <div
                        key={appliance._id}
                        className="appliance-card"
                        style={{ backgroundColor: appliance.bgColor, color: appliance.textColor }}
                    >

                        <img src={appliance.image} alt={appliance.name} className="appliance-image" />
                        <div className="appliance-name">{appliance.name}</div>
                        <p className="appliance-description">{appliance.description}</p>

                        {appliance._id && <Link to={`/product/${appliance._id}`}>
                            <button className="add-to-cart-product">See Product Details</button>
                        </Link>}
                        {/* <div className="actions">
                            <button className="edit-button">✏ Edit</button>
                            <button className="delete-button" onClick={() => handleDelete(appliance._id)}>🗑 Delete</button>
                        </div> */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeAppliances;
