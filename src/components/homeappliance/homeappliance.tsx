import React from "react";
import { Link } from "react-router-dom";
import "./homeappliance.scss";

interface Appliance {
    id: number;
    name: string;
    description: string;
    image?: string;
}

const appliancesList: Appliance[] = [
    { id: 1, name: "Refrigerator", description: "Energy-efficient refrigerators to keep your food fresh.", image: "❄️" },
    { id: 2, name: "Washing Machine", description: "Top & front load washing machines with smart features.", image: "🌀" },
    { id: 3, name: "Microwave", description: "High-tech microwave ovens for quick meals.", image: "🔥" },
    { id: 4, name: "Air Conditioner", description: "Powerful ACs for summer cooling.", image: "❄️" },
    { id: 5, name: "Vacuum Cleaner", description: "High suction power for deep cleaning.", image: "🧹" },
    { id: 6, name: "Water Purifier", description: "RO & UV water purifiers for safe drinking water.", image: "🚰" },
];

const HomeAppliances: React.FC = () => {
    return (
        <div className="home-appliances">
            <h2 className="title">Home Appliances</h2>
            <p className="subtitle">Click on an appliance to view full details.</p>
            
            <div className="appliance-list">
                {appliancesList.map((appliance) => (
                    <Link to={`/appliance/${appliance.id}`} key={appliance.id} className="appliance-card">
                        <div className="icon">{appliance.image}</div>
                        <div className="appliance-name">{appliance.name}</div>
                        <p className="appliance-description">{appliance.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HomeAppliances;
