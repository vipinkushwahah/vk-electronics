import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./productdetails.scss";
import StoreDetails from "../storedetails/storedetails";
import SkeletonLoader from "../hooks/skeletonloader/skeletonloader";

interface Product {
  _id: string;
  title: string;
  name: string;
  description: string;
  images?: Array<{ data: string }>; // Base64 encoded image(s)
  price: number;
  mrp: number;
  discount: number;
  bankOffer?: number;
  bankname?: string;
  colorVariants?: string;
  textColor?: string;
  bgColor?: string;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isStoreOpen, setIsStoreOpen] = useState(false); // New state for modal
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Index to track the current image in slideshow

  useEffect(() => {
    axios.get(`https://vk-electronics-backend.onrender.com/products/product/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    // Set up auto-slide for images
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % (product?.images?.length || 1));
    }, 4000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, [product]);

  if (loading) return <h2><SkeletonLoader variant="product" items={3} /></h2>;
  if (!product) return <h2>Product Not Found</h2>;

  // Get the image URLs or base64 data from the product images array
  const productImages = product.images && product.images.length > 0 ? product.images.map(img => img.data) : ["/default-image.jpg"];

  return (
    <div className="product-details-page" style={{ backgroundColor: product.bgColor, color: product.textColor }}>
      <Link to="/" className="back-button"><i className="ri-home-9-fill"></i></Link>

      {/* Slideshow for product images */}
      <div className="product-image-container">
        {productImages.length > 0 ? (
          <img
            src={productImages[currentImageIndex]}
            alt={product.name || product.title}
            className="product-image"
          />
        ) : (
          <div className="no-image">No image available</div>
        )}

        {/* Dots as slideshow indicators */}
        <div className="image-dots">
          {productImages.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentImageIndex ? "active" : ""}`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Slideshow Navigation */}
      {productImages.length > 1 && (
        <>
          <button className='prev-button' onClick={() => setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length)}>
          <i className="ri-arrow-left-wide-line"></i>
          </button>
          <button className="next-button" onClick={() => setCurrentImageIndex((prev) => (prev + 1) % productImages.length)}>
          <i className="ri-arrow-right-wide-fill"></i>
          </button>
        </>
      )}

      <div className="details">
        <h2 className="product-title">{product.name ? product.name : product.title || "Unnamed Product"}</h2>
        <p className="description">{product.description}</p>
        {product.price && (
          <div className="price">-{product.discount}% <span className="discount">₹{product.price}</span></div>
        )}
        {product.mrp && (
          <p className="product-mrp">M.R.P.: <span className="mrp-underline">₹{product.mrp}</span></p>
        )}
        <p className="bank-offer">
        Buy for ₹{product.bankOffer} with {product.bankname}
        </p>
        <button className="buy-now" onClick={() => setIsStoreOpen(true)}>Visit Store Now</button>
      </div>

      {/* Show StoreDetails Modal when isStoreOpen is true */}
      <StoreDetails isOpen={isStoreOpen} onClose={() => setIsStoreOpen(false)} />
    </div>
  );
};

export default ProductDetails;
