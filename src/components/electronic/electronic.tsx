import React from "react";
import { Link } from "react-router-dom";
import "./electronic.scss";

interface Gadget {
    id: number;
    name: string;
    description: string;
    image?: string; // Icon URL or class
}

const gadgetsList: Gadget[] = [
    { id: 1, name: "Speakers", description: "High-quality sound speakers for an immersive experience.", image: "🔊" },
    { id: 2, name: "Chargers", description: "Fast chargers for all smartphone models.", image: "🔌" },
    { id: 3, name: "Earbuds", description: "Wireless earbuds with noise cancellation.", image: "🎧" },
    { id: 4, name: "Earphones", description: "Wired and wireless earphones with deep bass.", image: "🎤" },
    { id: 5, name: "Screen Guard", description: "Protect your smartphone screen with durable guards.", image: "📱" },
    { id: 6, name: "Power Bank", description: "Portable power banks for long-lasting battery life.", image: "🔋" },
    { id: 7, name: "Mobile Cover", description: "Stylish and protective covers for your smartphones.", image: "📲" },
    { id: 8, name: "Pendrive", description: "High-speed USB flash drives for storage needs.", image: "💾" },
    { id: 9, name: "USB Cable", description: "Durable and fast-charging USB cables.", image: "🔗" },
    { id: 10, name: "Tempered Glass", description: "Scratch-resistant tempered glass for screens.", image: "🛡️" },
];

const ElectronicGadgets: React.FC = () => {
    return (
        <div className="electronic-gadgets">
            <h2 className="title">Electronic Gadgets</h2>
            <p className="subtitle">Click on a gadget to view full details.</p>
            
            <div className="gadget-list">
                {gadgetsList.map((gadget) => (
                    <Link to={`/gadget/${gadget.id}`} key={gadget.id} className="gadget-card">
                        <div className="icon">{gadget.image}</div>
                        <div className="gadget-name">{gadget.name}</div>
                        <p className="gadget-description">{gadget.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ElectronicGadgets;
