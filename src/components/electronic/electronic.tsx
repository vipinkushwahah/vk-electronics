import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import SkeletonLoader from "../hooks/skeletonloader/skeletonloader";
import ProductCard from "../products/product";
import ProductDetails from "../productdetails/productdetails";
import "./electronic.scss";

interface Gadget {
  _id: string;
  name: string;
  description: string;
  image?: string;
  images?: Array<{ data: string }>;
//   textColor?: string;
//   bgColor?: string;
  price?: number;
  mrp?: number;
  discount?: number;
  bankOffer?: number;
  bankname?: string;
  colorVariants?: string;
  rating?: number;
  reviews?: number;
  features?: string[];
  inStock?: boolean;
  fastDelivery?: boolean;
  brand?: string;
}

const ElectronicGadgets: React.FC = () => {
  const [gadgets, setGadgets] = useState<Gadget[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchGadgets();
  }, []);

  const fetchGadgets = async () => {
    try {
      const response = await axios.get(
        "https://vk-electronics-backend.onrender.com/products/electronics"
      );
      setGadgets(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching gadgets:", error);
      setError("Failed to load gadgets. Please try again.");
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Gadget) => {
    console.log("Add to cart:", product);
    // Add actual cart logic here
  };

  const handleProductClick = (gadget: Gadget) => {
    setSelectedProductId(gadget._id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
  };

  return (
    <div className="electronic-gadgets">
      <Helmet>
        <title>Electronic Gadgets - VK Electronics</title>
        <meta
          name="description"
          content="Browse the latest electronic gadgets at VK Electronics. Shop now for the best deals!"
        />
        <meta
          name="keywords"
          content="electronics, gadgets, smart devices, online shopping"
        />
        <meta
          property="og:title"
          content="Electronic Gadgets - VK Electronics"
        />
        <meta
          property="og:description"
          content="Find the latest electronic gadgets with great discounts at VK Electronics."
        />
        <meta
          property="og:image"
          content="https://vk-electronics.netlify.app/default-gadget-image.jpg"
        />
        <meta
          property="og:url"
          content="https://vk-electronics.netlify.app/electronics"
        />
      </Helmet>

      <h2 className="title">Electronic Gadgets</h2>

      {loading && <SkeletonLoader variant="gadget" items={6} />}
      {error && <p className="error">{error}</p>}

      <div className="gadget-list">
        {gadgets.map((gadget) => (
          <ProductCard
            key={gadget._id}
            product={{
              ...gadget,
              title: gadget.name,
              price: gadget.price || 0,
              discount: gadget.discount || 0,
              inStock: gadget.inStock ?? true,
              fastDelivery: gadget.fastDelivery ?? true,
              rating: gadget.rating || 4,
              reviews: gadget.reviews || 100,
              features: gadget.features || [],
              brand: gadget.brand ,
            }}
            onAddToCart={(product) =>
              handleAddToCart({
                ...product,
                name: product.name || "Unnamed Gadget",
              })
            }
            onClick={() => handleProductClick(gadget)}
            onDelete={() => {}}
          />
        ))}
      </div>

      {/* Product Details Modal */}
      {selectedProductId && (
        <ProductDetails
          productId={selectedProductId}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default ElectronicGadgets;
