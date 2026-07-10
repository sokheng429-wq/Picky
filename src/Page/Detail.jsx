import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./Detail.css";
import { getProductById, addReview } from "../services/productService.js";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();

    const [perfume, setPerfume] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [qty, setQty] = useState(1);
    const [reviewRating, setReviewRating] = useState(5);
    const [submittingReview, setSubmittingReview] = useState(false);

    const loadProduct = () => {
        setLoading(true);
        getProductById(id)
            .then((data) => setPerfume(data))
            .catch((err) => setError(err?.message || "Could not load this product."))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleSubmitReview = async () => {
        if (!isAuthenticated) {
            navigate("/login", { state: { from: { pathname: `/detail/${id}` } } });
            return;
        }
        setSubmittingReview(true);
        try {
            const updated = await addReview(id, { rating: reviewRating });
            setPerfume(updated);
            setReviewRating(5);
        } catch (err) {
            alert(err?.message || "Could not submit your review.");
        } finally {
            setSubmittingReview(false);
        }
    };

    if (loading) {
        return (
            <div className="detail-page">
                <div className="detail-container" style={{ justifyContent: "center", textAlign: "center" }}>
                    <p>Loading product…</p>
                </div>
            </div>
        );
    }

    if (error || !perfume) {
        return (
            <div className="detail-page">
                <div className="detail-container" style={{ justifyContent: "center", textAlign: "center" }}>
                    <div>
                        <h2>{error || "Perfume not found 🌸"}</h2>
                        <Link to="/shop" className="back-btn">← Back To Shop</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="detail-page">
            <div className="detail-container">

                <div className="detail-image">
                    <img
                        src={perfume.image}
                        alt={perfume.name}
                    />
                    {perfume.badge && (
                        <span className={`badge-tag ${perfume.badge === "Best Seller" ? "badge-bestseller" : "badge-new"}`}>
                            {perfume.badge}
                        </span>
                    )}
                </div>

                <div className="detail-info">
                    <p className="brand-name">{perfume.brand}</p>
                    <h1>{perfume.name}</h1>

                    <div className="detail-stars">
                        {"⭐".repeat(Math.round(perfume.rating))}
                        <span className="rating-count">
                            {perfume.rating} ({perfume.reviewsCount ?? perfume.reviews?.length ?? 0} reviews)
                        </span>
                    </div>

                    <div className="price-row">
                        <h2>${perfume.price}</h2>
                        {perfume.oldPrice && <span className="old-price">${perfume.oldPrice}</span>}
                    </div>

                                        <p>Smell: {perfume.smell}</p>

                                        {perfume.description && (
                                            <div className="detail-description">
                                                <h4>Description</h4>
                                                <p>{perfume.description}</p>
                                            </div>
                                        )}

                                        {perfume.notes && (
                                            <>
                                                <h4>Fragrance Notes</h4>
                                                <ul>
                                                    <li>Top Notes: {perfume.notes.top}</li>
                                                    <li>Heart Notes: {perfume.notes.heart}</li>
                                                    <li>Base Notes: {perfume.notes.base}</li>
                                                    <li>{perfume.size}</li>
                                                </ul>
                                            </>
                                        )}

                    <p className="stock-note">
                        {perfume.stock <= 15
                            ? `Only ${perfume.stock} left in stock — order soon!`
                            : "In stock and ready to ship"}
                    </p>

                    <div className="qty-row">
                        <span>Quantity</span>
                        <div className="qty-stepper">
                            <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                            <span>{qty}</span>
                            <button onClick={() => setQty((q) => Math.min(perfume.stock, q + 1))}>+</button>
                        </div>
                    </div>

                    <div className="detail-actions">
                        <button
                            onClick={() => addToCart(perfume, qty)}
                        >
                            Add To Cart 💕
                        </button>

                        <button
                            className="buy-now-btn"
                            onClick={() => {
                                addToCart(perfume, qty);
                                navigate("/cart");
                            }}
                        >
                            Buy Now
                        </button>
                        {isAuthenticated && (
                            <Link to={`/addproduct?edit=${perfume.id}`} className="detail-btn" style={{alignSelf: 'center'}}>
                              Edit Product
                            </Link>
                        )}
                    </div>

                                        <div className="review-section" style={{marginTop:20}}>
                                                <h4>Leave a Review</h4>
                                                <div style={{display:'flex', gap:10, alignItems:'center'}}>
                                                    <div style={{display:'flex', gap:6}}>
                                                        {[1,2,3,4,5].map((s)=> (
                                                            <button key={s} onClick={() => setReviewRating(s)} style={{border:'none', background:'transparent', cursor:'pointer', color: s <= reviewRating ? '#ffb400' : '#ddd', fontSize:20}}>
                                                                ★
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div style={{marginTop:10}}>
                                                        <button className="cart-btn" disabled={submittingReview} onClick={handleSubmitReview}>
                                                            {submittingReview ? "Submitting…" : "Submit Review"}
                                                        </button>
                                                </div>

                                                {perfume.reviews && perfume.reviews.length > 0 && (
                                                    <div style={{marginTop:16}}>
                                                        <h5>Reviews</h5>
                                                        <div style={{display:'grid', gap:10}}>
                                                                {perfume.reviews.slice().reverse().map(r=> (
                                                                    <div key={r.id} style={{padding:10, background:'#fff', borderRadius:8, boxShadow:'0 6px 18px rgba(0,0,0,0.04)'}}>
                                                                        <div style={{color:'#ffb400'}}>{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</div>
                                                                        <div style={{fontSize:12, color:'#888', marginTop:6}}>{new Date(r.date).toLocaleString()}</div>
                                                                    </div>
                                                                ))}
                                                        </div>
                                                    </div>
                                                )}
                                        </div>

                    <Link
                        to="/shop"
                        className="back-btn"
                    >
                        ← Back To Shop
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Detail;
