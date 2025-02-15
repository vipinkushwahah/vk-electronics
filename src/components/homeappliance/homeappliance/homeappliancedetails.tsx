// import React from "react";
// import { useParams, Link } from "react-router-dom";
// import "./homeappliancedetails.scss";

// interface Appliance {
//     id: number;
//     name: string;
//     description: string;
//     image?: string;
//     details?: string;
// }

// const appliancesList: Appliance[] = [
//     { id: 1, name: "Refrigerator", description: "Energy-efficient refrigerators.", image: "❄️", details: "Keep your food fresh with our modern, energy-saving refrigerators." },
//     { id: 2, name: "Washing Machine", description: "Smart washing machines.", image: "🌀", details: "Our washing machines come with AI technology and eco-friendly modes." },
//     { id: 3, name: "Microwave", description: "Smart microwaves.", image: "🔥", details: "Enjoy faster cooking with our high-efficiency microwaves." },
//     { id: 4, name: "Air Conditioner", description: "Powerful ACs.", image: "❄️", details: "Cool your home efficiently with our energy-saving air conditioners." },
//     { id: 5, name: "Vacuum Cleaner", description: "Deep cleaning.", image: "🧹", details: "Powerful suction and smart sensors for effective cleaning." },
// ];

// const ApplianceDetails: React.FC = () => {
//     const { id } = useParams<{ id: string }>();
//     const appliance = appliancesList.find((a) => a.id === Number(id));

//     if (!appliance) {
//         return <h2>Appliance not found</h2>;
//     }

//     return (
//         <div className="appliance-details">
//             <Link to="/home-appliances" className="back-button">← Back to Home Appliances</Link>
//             <h2 className="title">{appliance.name}</h2>
//             <div className="icon">{appliance.image}</div>
//             <p className="description">{appliance.details}</p>
//         </div>
//     );
// };

// export default ApplianceDetails;
