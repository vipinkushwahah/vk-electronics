import React from 'react';
import { Star, ShoppingCart, Zap, Truck } from 'lucide-react';
import './product.scss';

interface Product {
  _id: string;
  title: string;
  name?: string;
  description: string;
  image?: string;
  images?: Array<{ data: string }>;
  price: number;
  mrp?: number;
  discount: number;
  bankOffer?: number;
  bankname?: string;
  colorVariants?: string;
//   textColor?: string;
//   bgColor?: string;
  rating?: number;
  reviews?: number;
  features?: string[];
  inStock?: boolean;
  fastDelivery?: boolean;
  brand?: string;
  originalPrice?: number;
}

interface ProductCardProps {
  product: Product;
  onDelete: (id: string) => void;
  onClick: () => void; // Open modal
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onAddToCart }) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering onClick (modal open)
    onAddToCart(product);
  };

  const imageSrc =
    product.image || (product.images && product.images[0]?.data) || '/default-image.png';

  return (
    <div className="product-card-container">
      <div
        className="product-card"
        onClick={onClick}
        // style={{
        //   backgroundImage: product.bgColor
        //     ? undefined
        //     : 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
        //   backgroundColor: product.bgColor || undefined,
        //   color: product.textColor || '#000000',
        // }}
      >
        {product.discount && (
          <div className="product-card__discount-badge">-{product.discount}%</div>
        )}

        {product.fastDelivery && (
          <div className="product-card__fast-badge">
            <Zap size={12} />
            Fast
          </div>
        )}

        {/* Removed <Link> and made image clickable via onClick */}
        <div className="product-card__image-wrapper">
          <img
            src={imageSrc}
            alt={product.title || product.name || 'Product'}
            className="product-card__image"
            onError={(e) =>
              ((e.target as HTMLImageElement).src = '/default-image.png')
            }
          />
          <div className="product-card__overlay" />
        </div>

        <div className="product-card__content">
          <div>
            {product.brand && <p className="product-card__brand">{product.brand}</p>}
            <h3 className="product-card__name">{product.title || product.name}</h3>
          </div>

          <div className="product-card__rating">
            {product.rating !== undefined && (
              <div className="product-card__stars">
                <Star className="product-card__star-icon" />
                <span>{product.rating}</span>
              </div>
            )}
            {product.reviews !== undefined && (
              <span className="product-card__reviews">({product.reviews})</span>
            )}
          </div>

          <div className="product-card__price-row">
            <span className="product-card__price">₹{product.price}</span>
            {product.mrp && (
              <span className="product-card__original-price">₹{product.mrp}</span>
            )}
          </div>

          {product.bankOffer && product.bankname && (
            <div className="bank-offer">
              Buy for ₹{product.bankOffer} with {product.bankname}
            </div>
          )}

          {product.colorVariants && (
            <div className="variants">+1 other color/pattern</div>
          )}

          {product.features && product.features.length > 0 && (
            <div className="product-card__features">
              {product.features.slice(0, 2).map((feature, index) => (
                <span key={index} className="product-card__feature">
                  {feature}
                </span>
              ))}
              {product.features.length > 2 && (
                <span className="product-card__more-features">
                  +{product.features.length - 2} more
                </span>
              )}
            </div>
          )}

          <button onClick={handleAddToCart} className="product-card__add-to-cart">
            <ShoppingCart size={18} />
            Add to Cart
          </button>

          <div className="product-card__stock-row">
            <span
              className={`product-card__stock ${
                product.inStock ? 'in-stock' : 'out-of-stock'
              }`}
            >
              <div
                className={`product-card__dot ${
                  product.inStock ? 'in-stock' : 'out-of-stock'
                }`}
              />
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
            {product.fastDelivery && (
              <span className="product-card__fast-delivery">
                <Truck size={14} />
                Fast Delivery
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
