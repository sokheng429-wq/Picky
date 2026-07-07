import React from "react";
import "./Shop.css";


const perfumes = [

    {
        id:1,
        name:"Rose Elegance",
        price:"$59",
        image:"https://images.unsplash.com/photo-1594035910387-fea47794261f",
        smell:"A romantic floral scent with fresh roses, vanilla and soft musk."
    },


    {
        id:2,
        name:"Pink Dream",
        price:"$49",
        image:"https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc",
        smell:"Sweet fruity fragrance with strawberry, peach and warm sugar notes."
    },


    {
        id:3,
        name:"Luxury Blossom",
        price:"$89",
        image:"https://images.unsplash.com/photo-1595425970377-c9703cf48b7c",
        smell:"Elegant jasmine mixed with amber and a deep feminine touch."
    },


    {
        id:4,
        name:"Princess Love",
        price:"$69",
        image:"https://images.unsplash.com/photo-1619994403073-2cec844b8e63",
        smell:"A charming perfume with flowers, vanilla and creamy sweetness."
    },


    {
        id:5,
        name:"Golden Queen",
        price:"$99",
        image:"https://images.unsplash.com/photo-1600612253971-422e7f7faeb6",
        smell:"Luxury golden fragrance with oud, rose and warm spices."
    },


    {
        id:6,
        name:"Sweet Angel",
        price:"$55",
        image:"https://images.unsplash.com/photo-1590736969955-71cc94901144",
        smell:"Soft powdery perfume with lavender and sweet vanilla."
    }

];





const Shop = () => {


return (

<div className="shop-page">


    <div className="container">


        <div className="shop-title">

            <h1>
                Our Perfume Collection 💖
            </h1>

            <p>
                Find your perfect scent and express your beauty.
            </p>

        </div>





        <div className="row g-4">


        {
            perfumes.map((perfume)=>(


                <div
                className="col-lg-4 col-md-6"
                key={perfume.id}
                >


                    <div className="perfume-card">



                        <div className="image-box">


                            <img
                            src={perfume.image}
                            alt={perfume.name}
                            />


                            <span>
                                New ✨
                            </span>


                        </div>





                        <div className="perfume-info">


                            <h3>
                                {perfume.name}
                            </h3>


                            <div className="stars">
                                ⭐⭐⭐⭐⭐
                            </div>



                            <h4>
                                {perfume.price}
                            </h4>



                            <p>
                                {perfume.smell}
                            </p>



                            <button>
                                Add To Cart 💕
                            </button>


                        </div>



                    </div>



                </div>


            ))
        }



        </div>



    </div>



</div>


)

}


export default Shop;