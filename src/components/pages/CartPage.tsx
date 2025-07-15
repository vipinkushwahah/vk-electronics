// src/pages/CartPage.tsx
import React from 'react';
import useCart from '../../context/CartContext';
import { Link } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart } = useCart();

  if (cartItems.length === 0) {
    return <h2>Your cart is empty</h2>;
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <ul className="cart-list">
        {cartItems.map((item) => (
          <li key={item._id} className="cart-item">
            <img
              src={item.image || '/default-image.png'}
              alt={item.title}
              width={80}
            />
            <div>
              <h3>{item.title}</h3>
              <p>Price: ₹{item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <Link to={`/product/${item._id}`}>View Product</Link>
              <button onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;
