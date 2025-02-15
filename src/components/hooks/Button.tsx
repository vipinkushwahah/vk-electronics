import { useState } from "react";
import "./Button.scss";
import StoreDetails from "../storedetails/storedetails";

type ButtonProps = {
  text: string;
};

export const Button = ({ text }: ButtonProps) => {
  const [isStoreOpen, setIsStoreOpen] = useState(false); // New state for modal
  return(
    <div>
      <button onClick={() => setIsStoreOpen(true)} className="custom-button">{text}</button>
      {/* Show StoreDetails Modal when isStoreOpen is true */}
      <StoreDetails isOpen={isStoreOpen} onClose={() => setIsStoreOpen(false)} />
    </div>
  ) 
};

