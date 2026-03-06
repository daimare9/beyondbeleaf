"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Shop() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("/products.json")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Error loading products", err));
    }, []);

    return (
        <>
            <section className="section-padding" style={{ marginTop: "80px" }}>
                <div className="container products-container">
                    <div className="section-header text-center">
                        <span className="section-subtitle">Full Catalog</span>
                        <h2>Shop All Products</h2>
                        <p>Explore our complete range of natural healing solutions.</p>
                    </div>
                    <div className="product-grid">
                        {products.map((product, idx) => (
                            <ProductCard key={idx} product={product} />
                        ))}
                    </div>
                    <div
                        className="transparency-note text-center"
                        style={{ marginTop: "4rem" }}
                    >
                        <p>
                            <em>
                                Our complete ingredient lists are always printed clearly on
                                every product label. Full ingredient transparency is always
                                available upon request!
                            </em>
                        </p>
                        <p className="fda-disclaimer">
                            These statements have not been evaluated by the FDA. Our products
                            are not intended to diagnose, treat, cure, or prevent any disease!
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
