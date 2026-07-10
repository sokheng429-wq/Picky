import React from "react";
import "./Filter.css";

// `brands` is passed in by the parent page (which already has the loaded
// product list). This used to compute brands once at module import time,
// which meant it never picked up brands added/edited after the app
// started. Now it always reflects whatever data the parent last loaded
// from the API.
const Filter = ({
    brands = ["All"],
    selectedBrand,
    setSelectedBrand
}) => {
    return (
        <div className="filter-section">

            <h4>Filter By Brand</h4>

            {brands.map((brand) => (
                <button
                    key={brand}
                    className={
                        selectedBrand === brand
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        setSelectedBrand(brand)
                    }
                >
                    {brand}
                </button>
            ))}

        </div>
    );
};

export default Filter;
