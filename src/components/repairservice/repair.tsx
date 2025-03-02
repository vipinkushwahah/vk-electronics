import React from "react";
import "./repair.scss";
import { useNavigate } from "react-router-dom";

interface RepairService {
    id: number;
    name: string;
    description: string;
    image?: string; // Icon URL or class
    icon?: string; // Optional class name
}

const repairServices: RepairService[] = [
    {
        id: 1,
        name: "Smartphone Repair",
        description: "We fix all smartphone brands, including screen replacement, battery issues, and more.",
        image: "📱",
        icon: "",
    },
    {
        id: 2,
        name: "Keypad Phone Repair",
        description: "Repair services for classic keypad phones, including button and display fixes.",
        icon: "ri-cellphone-fill",
        image: "",
    },
    {
        id: 3,
        name: "Charger / Headphones",
        description: "Get your cracked headphones or charger replaced with high-quality parts.",
        image: "",
        icon: "ri-customer-service-fill",
    },
];

const RepairServices: React.FC = () => {
    const navigate = useNavigate();
    const handleAddReview = () => {
        navigate("/reviews"); // ✅ Navigate to reviews page
    };
    return (
        <div className="repair-services">
            <h2 className="title">Our Repair Services</h2>
            <p className="subtitle">We provide all kinds of repair services for smartphones and keypad phones.</p>
            <div className="service-list">
                {repairServices.map((service) => (
                    <div key={service.id} className="service-card">
                        <div className={`icon ${service.icon || ""}`}>
                            {service.image?.startsWith("/") ? (
                                <img src={service.image} alt={service.name} />
                            ) : (
                                service.image
                            )}
                        </div>
                        <div className="service-name">{service.name}</div>
                        <div className="service-description">{service.description}</div>
                    </div>
                ))}
            </div>
            <button className="add-review-btn" onClick={handleAddReview}>
                Add Review
            </button>
        </div>
    );
};

export default RepairServices;
