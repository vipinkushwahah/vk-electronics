import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { X, Star, ShoppingCart, Truck, Shield, Zap } from "lucide-react";
import SkeletonLoader from "../hooks/skeletonloader/skeletonloader";
import StoreDetails from "../storedetails/storedetails";
import "./productdetails.scss";

interface Product {
  _id: string;
  title: string;
  name: string;
  description: string;
  image?: string;
  images?: Array<{ data: string }>;
  price: number;
  mrp: number;
  discount: number;
  bankOffer?: number;
  bankname?: string;
  colorVariants?: string;
  // textColor?: string;
  // bgColor?: string;
  rating?: number;
  reviews?: number;
  features?: string[];
  specifications?: Record<string, string>;
  inStock?: boolean;
  fastDelivery?: boolean;
}

interface ProductDetailsModalProps {
  productId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetails: React.FC<ProductDetailsModalProps> = ({ productId, isOpen, onClose }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isStoreOpen, setIsStoreOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!productId || !isOpen) return;

    setLoading(true);
    setError(null);
    axios
      .get(`https://vk-electronics-backend.onrender.com/products/product/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setError("Failed to load product. Please try again.");
        setLoading(false);
      });
  }, [productId, isOpen]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % (product?.images?.length || 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [product]);

  if (!isOpen) return null;

  const productImages =
    product?.images && product.images.length > 0
      ? product.images.map((img) => img.data)
      : [product?.image || "/default-image.jpg"];

  const handleAddToCart = () => {
    console.log("Add to cart:", product);
    // Implement cart logic
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const modalRef = useRef<HTMLDivElement>(null);

// Memoize outside click handler
// eslint-disable-next-line react-hooks/rules-of-hooks
const handleClickOutside = useCallback(
  (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  },
  [onClose]
);

// eslint-disable-next-line react-hooks/rules-of-hooks
useEffect(() => {
  if (isOpen) {
    document.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [isOpen, handleClickOutside]);

if (!isOpen) return null;


  return (
    <div className="modal-overlay">
      <div
        className="product-modal"
        // style={{
        //   backgroundColor: product?.bgColor || "#fff",
        //   color: product?.textColor || "#000",
        // }}
        ref={modalRef}
      >
        <div className="product-modal__container">
          <button className="product-modal__close-btn" onClick={onClose}>
            <X className="icon icon--close" />
          </button>

          <div className="product-modal__content">
            {loading ? (
              <SkeletonLoader variant="product" items={3} />
            ) : error ? (
              <div className="product-modal__error">
                <h2>Error</h2>
                <p>{error}</p>
              </div>
            ) : product ? (
              <>
                <div className="product-modal__grid">
                  <div className="product-modal__image-wrapper">
                    {product.discount && (
                      <div className="product-modal__discount">-{product.discount}% OFF</div>
                    )}
                    <img
                      src={productImages[currentImageIndex]}
                      alt={product.name}
                      className="product-modal__image"
                    />
                    {productImages.length > 1 && (
                      <div className="image-controls">
                        <button onClick={() => setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length)}>‹</button>
                        <button onClick={() => setCurrentImageIndex((prev) => (prev + 1) % productImages.length)}>›</button>
                      </div>
                    )}
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

                  <div className="product-modal__details">
                    <div>
                      <p className="product-modal__brand">{product.title}</p>
                      <h2 className="product-modal__name">{product.name}</h2>
                      <p className="product-modal__description">{product.description}</p>
                    </div>

                    {product.rating !== undefined && (
                      <div className="product-modal__rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`icon icon--star ${
                              star <= Math.floor(product.rating!) ? "icon--filled" : "icon--empty"
                            }`}
                          />
                        ))}
                        <span className="product-modal__rating-value">{product.rating}</span>
                        <span className="product-modal__reviews">({product.reviews || 0} reviews)</span>
                      </div>
                    )}

                    <div className="product-modal__price">
                      <span className="price--current">₹{product.price}</span>
                      {product.mrp && <span className="price--original">₹{product.mrp}</span>}
                      {product.discount && product.mrp && (
                        <span className="price--save">Save ₹{(product.mrp - product.price).toFixed(2)}</span>
                      )}
                    </div>

                    {product.bankOffer && (
                      <p className="bank-offer">
                        Buy for ₹{product.bankOffer} with {product.bankname}
                      </p>
                    )}

                    <div className="product-modal__status">
                      <div
                        className={`status-badge ${
                          product.inStock ? "status-badge--in-stock" : "status-badge--out-of-stock"
                        }`}
                      >
                        <div className="status-dot" />
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </div>

                      {product.fastDelivery && (
                        <div className="status-badge status-badge--fast">
                          <Truck size={16} />
                          Fast Delivery
                        </div>
                      )}

                      <div className="status-badge status-badge--warranty">
                        <Shield size={16} />
                        1 Year Warranty
                      </div>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                      className="product-modal__cart-btn"
                    >
                      <ShoppingCart size={24} />
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </button>

                    <button className="buy-now" onClick={() => setIsStoreOpen(true)}>
                      Visit Store Now
                    </button>
                  </div>
                </div>

                {product.features && (
                  <div className="product-modal__section">
                    <h3 className="section-title">Key Features</h3>
                    <div className="product-modal__features">
                      {product.features.map((feature, index) => (
                        <div key={index} className="feature-item">
                          <Zap className="icon icon--feature" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {product.specifications && (
                  <div className="product-modal__section">
                    <h3 className="section-title">Specifications</h3>
                    <div className="product-modal__specs">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="spec-item">
                          <span className="spec-key">{key}:</span>
                          <span className="spec-value">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : null}
          </div>
        </div>

        <StoreDetails isOpen={isStoreOpen} onClose={() => setIsStoreOpen(false)} />
      </div>
    </div>
  );
};

export default ProductDetails;
