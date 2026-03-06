"use client";

import React from "react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    const handleAdd = () => {
        addToCart(product);
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
                <button className="btn btn-primary btn-block" onClick={handleAdd}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
