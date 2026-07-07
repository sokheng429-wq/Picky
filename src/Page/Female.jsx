import React from "react";
import "./Female.css";
import { FaShoppingBag, FaHeart, FaStar } from "react-icons/fa";

const perfumes = [
  {
    id: 1,
    name: "Rose Elegance",
    price: "$89",
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f"
  },
  {
    id: 2,
    name: "Pink Blossom",
    price: "$99",
    image:
      "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc"
  },
  {
    id: 3,
    name: "Luxury Queen",
    price: "$120",
    image:
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59d75"
  },
  {
    id: 4,
    name: "Velvet Rose",
    price: "$110",
    image:
      "https://images.unsplash.com/photo-1615634262417-9b5c2a1f1c7c"
  }
];


function Female() {
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

          <button>
            Explore Collection
          </button>

        </div>

      </section>



      {/* Title */}

      <section className="collection-title">

        <h2>
          Women's Signature Scents
        </h2>

        <p>
          Luxury fragrances that define your beauty
        </p>

      </section>



      {/* Products */}

      <div className="container">

        <div className="row">

          {
            perfumes.map((item)=>(

              <div
                className="col-lg-3 col-md-6 mb-4"
                key={item.id}
              >

                <div className="perfume-card">


                  <div className="image-box">

                    <img
                      src={item.image}
                      alt={item.name}
                    />


                    <span className="wishlist">
                      <FaHeart />
                    </span>


                  </div>



                  <div className="perfume-info">

                    <h3>
                      {item.name}
                    </h3>


                    <div className="stars">

                      <FaStar/>
                      <FaStar/>
                      <FaStar/>
                      <FaStar/>
                      <FaStar/>

                    </div>


                    <h4>
                      {item.price}
                    </h4>


                    <button className="bag-btn">

                      <FaShoppingBag/>

                      Add To Bag

                    </button>


                  </div>


                </div>


              </div>

            ))
          }

        </div>

      </div>


    </div>
  );
}


export default Female;