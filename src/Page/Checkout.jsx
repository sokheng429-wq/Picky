import React from "react";
import "./Checkout.css";

const Cart = () => {

  return (
    <div className="cart-page">

      <div className="container">

        <h1 className="cart-title">
          🛍 Your Shopping Bag
        </h1>


        <div className="row mt-5">


          {/* Products */}
          <div className="col-lg-8">


            <div className="cart-card">

              <img
                src="https://images.unsplash.com/photo-1594035910387-fea47794261f"
                alt="perfume"
              />


              <div className="cart-info">

                <h3>
                  Rose Elegance
                </h3>

                <p>
                  Romantic floral perfume
                </p>

                <h5>
                  $59
                </h5>


                <button className="remove-btn">
                  Remove
                </button>


              </div>


            </div>



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
                    $59
                  </span>
                </p>


                <p>
                  Shipping
                  <span>
                    $5
                  </span>
                </p>


                <hr/>


                <h4>
                  Total
                  <span>
                    $64
                  </span>
                </h4>


              </div>



              <button className="checkout-btn">
                Proceed To Checkout 💗
              </button>


            </div>


          </div>


        </div>


      </div>


    </div>
  );
};


export default Cart;