

import React from "react";
import { FaHeart, FaShoppingBag, FaTrash } from "react-icons/fa";
import "./Favorites.css";
import { useFavorites } from "../context/FavoritesContext.jsx";
import { useCart } from "../context/CartContext.jsx";

const Favorites = () => {
  const { items: favoriteItems, removeFavorite } = useFavorites();
  const { addToCart } = useCart();

  return (
    <div className="favorites-page">
      <div className="container py-5">
        <div className="favorites-header text-center mb-5">
          <h1 className="favorites-title">
            <FaHeart className="heart-icon" />
            My Favorites
          </h1>
          <p className="favorites-subtitle">Your most-loved fashion pieces in one place.</p>
        </div>

        {favoriteItems.length > 0 ? (
          <div className="row g-4">
            {favoriteItems.map((item) => (
              <div key={item.id} className="col-md-6 col-lg-4">
                <div className="favorite-card">
                  <div className="favorite-image-wrapper">
                    <img src={item.image} alt={item.name} className="favorite-image" />

                    <button className="remove-favorite-btn" onClick={() => removeFavorite(item.id)}>
                      <FaTrash />
                    </button>
                  </div>

                  <div className="favorite-content">
                    <h5>{item.name}</h5>
                    <p className="favorite-price">${item.price}</p>

                    <button className="add-cart-btn" onClick={() => addToCart(item)}>
                      <FaShoppingBag /> Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-favorites text-center py-5">
            <FaHeart className="empty-heart" />
            <h3>No Favorites Yet</h3>
            <p>Start adding products you love ❤️</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;

