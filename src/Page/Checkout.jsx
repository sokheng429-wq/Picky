import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Checkout.css";
import { useCart } from "../context/CartContext.jsx";

const FREE_SHIPPING_THRESHOLD = 100;
const SHIPPING_FEE = 5;

const Cart = () => {
  const { items, removeFromCart, updateQty, subtotal } = useCart();
  const [placed, setPlaced] = useState(false);

  const shipping = items.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  if (placed) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="order-placed">
            <h1>Thank you! 💗</h1>
            <p>Your order has been placed and is on its way to you.</p>
            <Link to="/shop" className="checkout-btn" style={{ display: "inline-block", textDecoration: "none" }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">

      <div className="container">

        <h1 className="cart-title">
          🛍 Your Shopping Bag
        </h1>

        {items.length === 0 ? (
          <div className="empty-cart">
            <p>Your bag is empty 🌸</p>
            <Link to="/shop" className="checkout-btn" style={{ display: "inline-block", textDecoration: "none" }}>
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="row mt-5">

            {/* Products */}
            <div className="col-lg-8">

              {items.map((item) => (
                <div className="cart-card" key={item.id}>

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="cart-info">

                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      {item.brand} · {item.size}
                    </p>

                    <h5>
                      ${item.price}
                    </h5>

                    <div className="qty-stepper">
                      <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                    </div>

                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </button>

                  </div>

                </div>
              ))}

            </div>

            {/* Checkout */}
            <div className="col-lg-4">

              <div className="checkout-box">

                <h3>
                  Order Summary
                </h3>

                <div className="summary">

                  <p>
                    Subtotal
                    <span>
                      ${subtotal.toFixed(2)}
                    </span>
                  </p>

                  <p>
                    Shipping
                    <span>
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </p>

                  {subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD && (
                    <p className="shipping-note">
                      Add ${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} more for free shipping ✨
                    </p>
                  )}

                  <hr/>

                  <h4>
                    Total
                    <span>
                      ${total.toFixed(2)}
                    </span>
                  </h4>

                </div>

                <button className="checkout-btn" onClick={() => setPlaced(true)}>
                  Proceed To Checkout 💗
                </button>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};


export default Cart;
