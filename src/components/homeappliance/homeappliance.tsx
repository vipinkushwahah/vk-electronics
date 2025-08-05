import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import SkeletonLoader from "../hooks/skeletonloader/skeletonloader";
import ProductCard from "../products/product";
import ProductDetails from "../productdetails/productdetails";
import "./homeappliance.scss";

interface Appliance {
  _id: string;
  name: string;
  description: string;
  image?: string; // URL image
  images?: Array<{ data: string }>; // Base64 encoded image(s)
  price?: number;
  mrp?: number;
  discount?: number;
  textColor?: string;
  bgColor?: string;
  rating?: number;
  reviews?: number;
  features?: string[];
  inStock?: boolean;
  fastDelivery?: boolean;
  brand?: string;
}

const HomeAppliances: React.FC = () => {
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchAppliances();
  }, []);

  const fetchAppliances = async () => {
    try {
      const response = await axios.get(
        "https://vk-electronics-backend.onrender.com/products/home-appliance"
      );
      setAppliances(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching appliances:", error);
      setError("Failed to load appliances. Please try again.");
      setLoading(false);
    }
  };

  // const handleAddToCart = (product: Appliance) => {
  //   console.log("Add to cart:", product);
  //   // Add actual cart logic here
  // };

  const handleProductClick = (appliance: Appliance) => {
    setSelectedProductId(appliance._id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
  };

  return (
    <div className="home-appliances">
      <Helmet>
        <title>Home Appliances - VK Electronics</title>
        <meta
          name="description"
          content="Shop the latest home appliances at VK Electronics. Get great deals on kitchen and home essentials!"
        />
        <meta
          name="keywords"
          content="home appliances, kitchen appliances, electronics, best deals, online shopping"
        />
        <meta property="og:title" content="Home Appliances - VK Electronics" />
        <meta
          property="og:description"
          content="Explore a wide range of high-quality home appliances at VK Electronics. Shop now!"
        />
        <meta
          property="og:image"
          content="https://vk-electronics.netlify.app/default-home-appliance-image.jpg"
        />
        <meta
          property="og:url"
          content="https://vk-electronics.netlify.app/home-appliance"
        />
      </Helmet>

      <h2 className="title">Home Appliances</h2>

      {loading && <SkeletonLoader variant="gadget" items={6} />}
      {error && <p className="error">{error}</p>}

      <div className="appliance-list">
        {appliances.map((appliance) => (
          <ProductCard
            key={appliance._id}
            product={{
              ...appliance,
              title: appliance.name,
              price: appliance.price || 0,
              discount: appliance.discount || 0,
              inStock: appliance.inStock ?? true,
              fastDelivery: appliance.fastDelivery ?? true,
              rating: appliance.rating || 4,
              reviews: appliance.reviews || 100,
              features: appliance.features || [],
              brand: appliance.brand,
            }}
            // onAddToCart={(product) =>
            //   handleAddToCart({
            //     ...product,
            //     name: product.name || "Unnamed Appliance",
            //   })
            // }
            onClick={() => handleProductClick(appliance)}
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

export default HomeAppliances;
