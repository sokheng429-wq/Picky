import React from "react";
import { FaHeart, FaGem, FaLeaf, FaStar } from "react-icons/fa";
import "./About.css";

function About() {
  return (
    <div className="about-page">

      {/* Hero Section */}
      <section className="about-hero">
        <div className="container text-center">

          <h1>
            Discover <span>Pinky</span>
          </h1>

          <p>
            Where beauty meets elegance. A luxury fashion and fragrance
            experience designed for modern women and men.
          </p>

        </div>
      </section>


      {/* Brand Story */}
      <section className="about-story py-5">

        <div className="container">

          <div className="row align-items-center">

            <div className="col-lg-6 mb-4">

              <div className="about-image">
                <img
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348"
                  alt="Luxury Beauty"
                />
              </div>

            </div>


            <div className="col-lg-6">

              <h2>
                The Essence of <span>Pinky</span>
              </h2>

              <p>
                Pinky was created with one vision — to bring luxury beauty,
                elegant fashion, and unforgettable fragrances together.
              </p>

              <p>
                Every product reflects confidence, sophistication, and
                timeless style. From premium perfumes to modern fashion,
                Pinky celebrates individuality and beauty.
              </p>


              <button className="about-btn">
                Explore Collection
              </button>

            </div>

          </div>

        </div>

      </section>



      {/* Values */}
      <section className="about-values">

        <div className="container">

          <div className="text-center mb-5">

            <h2>
              Our <span>Values</span>
            </h2>

          </div>


          <div className="row g-4">


            <div className="col-md-3">

              <div className="value-card">

                <FaHeart />

                <h4>
                  Passion
                </h4>

                <p>
                  Creating beauty products with love and dedication.
                </p>

              </div>

            </div>



            <div className="col-md-3">

              <div className="value-card">

                <FaGem />

                <h4>
                  Luxury
                </h4>

                <p>
                  Premium quality inspired by elegance.
                </p>

              </div>

            </div>



            <div className="col-md-3">

              <div className="value-card">

                <FaLeaf />

                <h4>
                  Natural
                </h4>

                <p>
                  Carefully selected ingredients and formulas.
                </p>

              </div>

            </div>



            <div className="col-md-3">

              <div className="value-card">

                <FaStar />

                <h4>
                  Excellence
                </h4>

                <p>
                  A luxury experience made for everyone.
                </p>

              </div>

            </div>


          </div>

        </div>

      </section>



      {/* Quote Section */}
      <section className="about-quote">

        <div className="container text-center">

          <h2>
            "Beauty is not just what you wear,
            it is how you express yourself."
          </h2>

          <p>
            Pinky Luxury Collection
          </p>

        </div>

      </section>


    </div>
  );
}

export default About;