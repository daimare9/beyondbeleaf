"use client";

import React from "react";

export default function ProductCard({ product }) {
    const handleBuyNow = () => {
        // If the product has a specific SwipeSimple link, open it.
        // Otherwise, open a default/placeholder SwipeSimple checkout page.
        const checkoutUrl = product.swipeSimpleLink || "https://swipesimple.com/";
        window.open(checkoutUrl, "_blank");
    };

    return (
        <div className="product-card">
            <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-overlay">
                    <button className="btn btn-secondary btn-quick-view">
                        Quick View
                    </button>
                </div>
            </div>
            <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-desc">{product.description.substring(0, 80)}...</p>
                <span className="product-price">{product.price}</span>
                <button className="btn btn-primary btn-block" onClick={handleBuyNow}>
                    Buy Now
                </button>
            </div>
        </div>
    );
}
