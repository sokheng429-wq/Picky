import React, { useEffect, useMemo, useState } from "react";
import "./Shop.css";
import Filter from "../component/Filter.jsx";
import { Link, useSearchParams } from "react-router-dom";
import { getAllProducts } from "../services/productService.js";
import { useFavorites } from "../context/FavoritesContext.jsx";
import { useCart } from "../context/CartContext.jsx";

const Shop = () => {
    const [perfumes, setPerfumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { addToCart } = useCart();
    const { isFavorite, toggleFavorite } = useFavorites();

    const [selectedBrand, setSelectedBrand] = useState("All");
    const [sortBy, setSortBy] = useState("featured");
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTerm = searchParams.get("search") || "";

    useEffect(() => {
        let active = true;
        setLoading(true);
        getAllProducts()
            .then((data) => {
                if (active) setPerfumes(data);
            })
            .catch((err) => {
                if (active) setError(err?.message || "Could not load the perfume collection.");
            })
            .finally(() => {
                if (active) setLoading(false);
            });
        return () => {
            active = false;
        };
    }, []);

    const brands = useMemo(
        () => ["All", ...new Set(perfumes.map((p) => p.brand).filter(Boolean))],
        [perfumes]
    );

    const filteredPerfumes = useMemo(() => {
        let list = perfumes;

        if (selectedBrand !== "All") {
            list = list.filter((p) => p.brand === selectedBrand);
        }

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            list = list.filter(
                (p) =>
                    p.name.toLowerCase().includes(term) ||
                    p.brand.toLowerCase().includes(term)
            );
        }

        list = [...list];
        if (sortBy === "price-low") list.sort((a, b) => a.price - b.price);
        if (sortBy === "price-high") list.sort((a, b) => b.price - a.price);
        if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);

        return list;
    }, [perfumes, selectedBrand, searchTerm, sortBy]);

    return (
        <div className="shop-page">
            <div className="container">

                <div className="shop-title">
                    <h1>Our Perfume Collection 💖</h1>
                    <p>
                        Find your perfect scent and express your beauty.
                    </p>
                </div>

                {searchTerm && (
                    <div className="search-result-tag">
                        Showing results for <strong>"{searchTerm}"</strong>
                        <button
                            onClick={() => setSearchParams({})}
                            className="clear-search"
                        >
                            Clear ✕
                        </button>
                    </div>
                )}

                <div className="shop-toolbar">
                    <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
                        <input
                            placeholder="Search perfumes..."
                            value={searchTerm}
                            onChange={(e) => {
                                const v = e.target.value;
                                if (v.trim()) setSearchParams({ search: v });
                                else setSearchParams({});
                            }}
                            style={{padding: '10px 14px', borderRadius: 30, border: '1px solid #ffd6e8'}}
                        />
                    </div>

                    <Filter
                        brands={brands}
                        selectedBrand={selectedBrand}
                        setSelectedBrand={setSelectedBrand}
                    />

                    <select
                        className="sort-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="featured">Sort: Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Top Rated</option>
                    </select>
                </div>

                {loading && <p>Loading perfumes…</p>}
                {error && <p className="text-danger">{error}</p>}

                {!loading && !error && (
                    filteredPerfumes.length === 0 ? (
                        <div className="empty-shop">
                            <p>No perfumes match your search 🌸</p>
                            <button onClick={() => { setSelectedBrand("All"); setSearchParams({}); }}>
                                Reset Filters
                            </button>
                        </div>
                    ) : (
                        <div className="row g-4">
                            {filteredPerfumes.map((perfume) => (
                                <div
                                    className="col-lg-4 col-md-6"
                                    key={perfume.id}
                                >
                                    <div className="perfume-card">

                                        <div className="image-box">
                                            <img
                                                src={perfume.image}
                                                alt={perfume.name}
                                                loading="lazy"
                                            />

                                            {perfume.badge && (
                                                <span className={`badge-tag ${perfume.badge === "Best Seller" ? "badge-bestseller" : "badge-new"}`}>
                                                    {perfume.badge}
                                                </span>
                                            )}

                                            {perfume.stock <= 15 && (
                                                <span className="badge-lowstock">
                                                    Only {perfume.stock} left
                                                </span>
                                            )}

                                            <button
                                                className="wishlist"
                                                onClick={() => toggleFavorite(perfume)}
                                                aria-label={isFavorite(perfume.id) ? 'Remove favorite' : 'Add favorite'}
                                                style={{border:'none', background:'transparent', position: 'absolute', right: 20, top: 20}}
                                            >
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 21s-7.5-4.5-10-7.5C-0.3 9.4 2.6 4 7.5 4 10 4 12 6 12 6s2-2 4.5-2C21.4 4 24.3 9.4 22 13.5 19.5 16.5 12 21 12 21z" fill={isFavorite(perfume.id) ? '#ff1493' : '#ffffff'} stroke={isFavorite(perfume.id) ? '#ff1493' : '#e83e8c'} strokeWidth="0" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="perfume-info">

                                            <h3>{perfume.name}</h3>

                                            <p className="brand-name">
                                                {perfume.brand}
                                            </p>

                                            <div className="stars">
                                                {"⭐".repeat(Math.round(perfume.rating))}
                                                <span className="rating-count">({perfume.reviewsCount ?? perfume.reviews?.length ?? 0})</span>
                                            </div>

                                            <div className="price-row">
                                                <h4>${perfume.price}</h4>
                                                {perfume.oldPrice && (
                                                    <span className="old-price">${perfume.oldPrice}</span>
                                                )}
                                            </div>

                                            <p>{perfume.smell}</p>

                                            <div className="btn-group">

                                                <button
                                                    className="cart-btn"
                                                    onClick={() => addToCart(perfume)}
                                                >
                                                    Add To Bag 💕
                                                </button>

                                                <Link
                                                    to={`/detail/${perfume.id}`}
                                                    className="detail-btn"
                                                >
                                                    View Details 👀
                                                </Link>

                                            </div>

                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                )}

            </div>
        </div>
    );
};

export default Shop;
