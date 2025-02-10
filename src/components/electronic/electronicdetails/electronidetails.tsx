import React from "react";
import { useParams, Link } from "react-router-dom";
import "./electronicdetails.scss";

interface Gadget {
    id: number;
    name: string;
    description: string;
    image?: string;
    details?: string;
}

const gadgetsList: Gadget[] = [
    { id: 1, name: "Speakers", description: "High-quality sound speakers.", image: "🔊", details: "Enjoy crystal-clear sound with our premium speakers, featuring bass boost and surround sound technology." },
    { id: 2, name: "Chargers", description: "Fast chargers for smartphones.", image: "🔌", details: "Charge your devices quickly with our high-speed, durable chargers." },
    { id: 3, name: "Earbuds", description: "Wireless earbuds with noise cancellation.", image: "🎧", details: "Experience deep bass and seamless connectivity with our top-notch earbuds." },
    { id: 4, name: "Earphones", description: "Wired and wireless earphones.", image: "🎤", details: "Great sound quality and comfortable fit for long listening sessions." },
    { id: 5, name: "Screen Guard", description: "Durable screen protection.", image: "📱", details: "Scratch-resistant and ultra-clear screen protectors for your device." },
];

const GadgetDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const gadget = gadgetsList.find((g) => g.id === Number(id));

    if (!gadget) {
        return <h2>Gadget not found</h2>;
    }

    return (
        <div className="gadget-details">
            <Link to="electronics" className="back-button">← Back to Gadgets</Link>
            <h2 className="title">{gadget.name}</h2>
            <div className="icon">{gadget.image}</div>
            <p className="description">{gadget.details}</p>
        </div>
    );
};

export default GadgetDetails;
