import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Discover Your <span>Perfect Scent</span>
          </h1>

          <p>
            Luxury perfumes designed for women and men.
            Find a fragrance that represents your personality.
          </p>

          {/* Search */}
          <div className="search-box">
            <input
              type="text"
              placeholder="Search your favorite perfume..."
            />
            <button>
              Search
            </button>
          </div>
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

            <button>
              Shop Women
            </button>
          </div>


          <div className="category-card male">
            <h3>Male Perfume</h3>
            <p>
              Powerful, fresh and confident scents made for him.
            </p>

            <button>
              Shop Men
            </button>
          </div>

        </div>

      </section>



      {/* Featured Products */}
      <section className="products">

        <h2>
          Best Sellers
        </h2>


        <div className="product-grid">

          <div className="product-card">
            <div className="perfume-image">
              🌸
            </div>

            <h4>
              Rose Luxury
            </h4>

            <p>
              $59.99
            </p>

          </div>



          <div className="product-card">

            <div className="perfume-image">
              🌹
            </div>

            <h4>
              Velvet Bloom
            </h4>

            <p>
              $69.99
            </p>

          </div>




          <div className="product-card">

            <div className="perfume-image">
              🖤
            </div>

            <h4>
              Dark Ocean
            </h4>

            <p>
              $79.99
            </p>

          </div>


        </div>

      </section>


    </div>
  );
}


export default Home;