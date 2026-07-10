import React, { useEffect, useMemo, useState } from "react";
import "./Female.css";
import { Link } from "react-router-dom";
import { FaShoppingBag, FaHeart, FaStar } from "react-icons/fa";
import { getProductsByGender } from "../services/productService.js";
import Filter from "../component/Filter.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useFavorites } from "../context/FavoritesContext.jsx";

function Female() {
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [selectedBrand, setSelectedBrand] = useState("All");

  useEffect(() => {
    let active = true;
    setLoading(true);
    getProductsByGender("female")
      .then((data) => {
        if (active) setPerfumes(data);
      })
      .catch((err) => {
        if (active) setError(err?.message || "Could not load this collection.");
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

  const filtered = useMemo(() => {
    let out = perfumes.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    if (selectedBrand !== "All") out = out.filter((p) => p.brand === selectedBrand);
    if (sort === "price-asc") out = out.slice().sort((a, b) => a.price - b.price);
    if (sort === "price-desc") out = out.slice().sort((a, b) => b.price - a.price);
    return out;
  }, [perfumes, search, sort, selectedBrand]);

  

  return (
    <div className="female-page">


      {/* Hero Section */}

      <section className="female-hero">

        <div className="hero-content">

          <h1>
            Feminine Elegance
          </h1>

          <p>
            Discover luxury perfumes crafted for
            confident and graceful women.
          </p>

          <a href="#collection">
            <button>
              Explore Collection
            </button>
          </a>

        </div>

      </section>



      {/* Title */}

      <section className="collection-title" id="collection">

        <h2>
          Women's Signature Scents
        </h2>

        <p>
          Luxury fragrances that define your beauty
        </p>

      </section>



      {/* Products */}

      <div className="container">

        <div className="shop-toolbar">
          <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
            <input
              placeholder="Search perfumes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{padding: '10px 14px', borderRadius: 30, border: '1px solid #ffd6e8'}}
            />
          </div>

          <Filter brands={brands} selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand} />

          <div>
            <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="default">Sort</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
          </div>
        </div>

        {loading && <p>Loading collection…</p>}
        {error && <p className="text-danger">{error}</p>}

        {!loading && !error && (
        <div className="row">

          {
            filtered.map((item)=>(

              <div
                className="col-lg-3 col-md-6 mb-4"
                key={item.id}
              >

                <div className="perfume-card">


                  <div className="image-box">

                    <Link to={`/detail/${item.id}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                      />
                    </Link>

                    {item.badge && (
                      <span className={`badge-tag ${item.badge === "Best Seller" ? "badge-bestseller" : "badge-new"}`}>
                        {item.badge}
                      </span>
                    )}

                    <button
                      className="wishlist"
                      aria-label={isFavorite(item.id) ? "Remove favorite" : "Add favorite"}
                      onClick={() => toggleFavorite(item)}
                      style={{border:'none', background:'transparent'}}
                    >
                      <FaHeart style={{color: isFavorite(item.id) ? '#ff1493' : '#e83e8c', transform: isFavorite(item.id) ? 'scale(1.05)' : 'none'}} />
                    </button>


                  </div>



                  <div className="perfume-info">

                    <Link to={`/detail/${item.id}`} className="product-link">
                      <h3>
                        {item.name}
                      </h3>
                    </Link>


                    <div className="stars">

                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar key={i} style={{ opacity: i < Math.round(item.rating) ? 1 : 0.3 }} />
                      ))}

                    </div>


                    <div className="price-row">
                      <h4>
                        ${item.price}
                      </h4>
                      {item.oldPrice && <span className="old-price">${item.oldPrice}</span>}
                    </div>


                    <button className="bag-btn" onClick={() => addToCart(item)}>

                      <FaShoppingBag/>

                      Add To Bag

                    </button>

                    <Link to={`/detail/${item.id}`} className="detail-btn" style={{marginTop:10, display:'inline-block'}}>
                      View Product
                    </Link>


                  </div>


                </div>


              </div>

            ))
          }

        </div>
        )}

      </div>


    </div>
  );
}


export default Female;
