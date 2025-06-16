import React, { useEffect, useRef } from "react";
import "./storedetails.scss";
import pic from "../qrcode/vivek.jpg"

interface StoreDetailsProps {
  isOpen: boolean;
  onClose: () => void;
}

const StoreDetails: React.FC<StoreDetailsProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="store-modal">
      <div className="store-modal-content" ref={modalRef}>
        <button className="close-button" onClick={onClose}>✖</button>
        <h2 className="store-title">Vivek Kushwaha Electronics & Home Appliance</h2>

        <div className="store-info">
          <img 
            src={pic}
            alt="Store Front" 
            className="store-image"
          />
          
          <div className="store-details">
            <p><strong>📞 Contact:</strong> +91 9011 1262 23</p>
            <p><strong>📍 Address:</strong> Bangra Bazar, Lohari Bari, Bhatpar Rani, Deoria, Uttar Pradesh, India</p>
            <p><strong>📮 Pin Code:</strong> 274704</p>
          </div>
        </div>

        <h3 className="map-title">📍 Find Us on Google Maps</h3>
        <div className="map-container">
          <iframe
            title="Store Location"
            src="https://www.google.com/maps/embed?pb=!4v1739609120394!6m8!1m7!1spxfgliH22OvF1mjLsA3bZA!2m2!1d26.33508912044648!2d84.10975621594844!3f209.53424!4f0!5f0.7820865974627469"
            width="100%"
            height="300"
            style={{ border: "none", borderRadius: "10px" }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default StoreDetails;
