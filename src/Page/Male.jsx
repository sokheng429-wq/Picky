import React from "react";
import "./Male.css";

import {
  FaShoppingBag,
  FaHeart,
  FaStar
} from "react-icons/fa";


const perfumes = [

  {
    id:1,
    name:"Royal Oud",
    price:"$120",
    image:
    "https://images.unsplash.com/photo-1595425970377-c9703cf48b6f"
  },

  {
    id:2,
    name:"Midnight Black",
    price:"$99",
    image:
    "https://images.unsplash.com/photo-1619994403073-2cec844b8e63"
  },

  {
    id:3,
    name:"Gentleman Elite",
    price:"$140",
    image:
    "https://images.unsplash.com/photo-1594035910387-fea47794261f"
  },

  {
    id:4,
    name:"Ocean Luxury",
    price:"$110",
    image:
    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539"
  }

];



function Male(){

return(

<div className="male-page">


{/* Hero */}

<section className="male-hero">

<div className="male-content">


<h1>
  The Gentleman Collection
</h1>


<p>
  Powerful fragrances designed for
  confidence, elegance and charisma.
</p>


<button>
 Explore Men's Scents
</button>


</div>

</section>




{/* Title */}

<section className="male-title">

<h2>
Men's Signature Perfumes
</h2>


<p>
Luxury aromas for modern gentlemen
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


<div className="male-card">


<div className="male-image">


<img
src={item.image}
alt={item.name}
/>



<span className="male-heart">

<FaHeart/>

</span>


</div>




<div className="male-info">


<h3>
{item.name}
</h3>



<div className="male-stars">

<FaStar/>
<FaStar/>
<FaStar/>
<FaStar/>
<FaStar/>

</div>



<h4>
{item.price}
</h4>



<button className="male-btn">

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

)

}


export default Male;