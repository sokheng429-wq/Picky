import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Home.css";
import { getBestSellers } from "../services/productService.js";
import { useCart } from "../context/CartContext.jsx";

function Home() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [query, setQuery] = useState("");
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    getBestSellers(3)
      .then((data) => {
        if (active) setBestSellers(data);
      })
      .catch((err) => {
        if (active) setError(err?.message || "Could not load best sellers.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(query.trim() ? `/shop?search=${encodeURIComponent(query.trim())}` : "/shop");
  };

  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Discover Your <span className="shimmer-text">Perfect Scent</span>
          </h1>

          <p>
            Luxury perfumes designed for women and men.
            Find a fragrance that represents your personality.
          </p>

          {/* Search */}
          <form className="search-box" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search your favorite perfume..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">
              Search
            </button>
          </form>
        </div>
      </section>


      {/* Categories */}
      <section className="category-section">

        <h2>
          Explore Our Collection
        </h2>

        <div className="category-container">

          <div className="category-card female">
            <h3>Female Perfume</h3>
            <p>
              Elegant, sweet and romantic fragrances made for her.
            </p>

            <Link to="/female">
              <button>
                Shop Women
              </button>
            </Link>
          </div>


          <div className="category-card male">
            <h3>Male Perfume</h3>
            <p>
              Powerful, fresh and confident scents made for him.
            </p>

            <Link to="/male">
              <button>
                Shop Men
              </button>
            </Link>
          </div>

        </div>

      </section>



      {/* Featured Products */}
      <section className="products">

        <h2>
          Best Sellers
        </h2>

        {loading && <p>Loading best sellers…</p>}
        {error && <p className="text-danger">{error}</p>}

        {!loading && !error && (
          <div className="product-grid">

            {bestSellers.map((item) => (
              <div className="product-card" key={item.id}>
                <Link to={`/detail/${item.id}`} className="product-link">
                  <div className="perfume-image">
                    <img src={item.image} alt={item.name} loading="lazy" />
                  </div>

                  <h4>
                    {item.name}
                  </h4>
                </Link>

                <p>
                  ${item.price}
                </p>

                <button className="quick-add-btn" onClick={() => addToCart(item)}>
                  Add To Bag 💕
                </button>
              </div>
            ))}

          </div>
        )}

      </section>


    </div>
  );
}


export default Home;
