"use client";

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function Checkout() {
    const { cartItems, cartTotal } = useCart();
    const [shipping, setShipping] = useState(5.0);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleCheckoutSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg("");

        try {
            // In a real app you'd collect the form fields into an object and pass to API
            const formData = new FormData(e.target);
            const shippingDetails = Object.fromEntries(formData.entries());

            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items: cartItems, shippingDetails }),
            });

            const data = await res.json();
            if (data.url) {
                window.location.href = data.url; // Redirect to Stripe
            } else {
                setErrorMsg(data.error || "Failed to initialize secure checkout.");
                setIsLoading(false);
            }
        } catch (error) {
            setErrorMsg("Network error. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="checkout-page container">
            <div className="section-header text-center">
                <span className="section-subtitle">Secure Payment</span>
                <h2>Checkout securely</h2>
            </div>

            {cartItems.length === 0 ? (
                <div className="text-center" style={{ marginTop: "4rem" }}>
                    <p>Your cart is empty.</p>
                    <Link href="/shop" className="btn btn-primary">
                        Back to Shop
                    </Link>
                </div>
            ) : (
                <div className="checkout-grid">
                    <form className="checkout-form-section" onSubmit={handleCheckoutSubmit}>
                        <h3>Shipping Details</h3>
                        <div className="checkout-row">
                            <input type="text" name="firstName" className="checkout-input" placeholder="First Name" required />
                            <input type="text" name="lastName" className="checkout-input" placeholder="Last Name" required />
                        </div>
                        <div className="checkout-row" style={{ gridTemplateColumns: "1fr" }}>
                            <input type="text" name="address" className="checkout-input" placeholder="Address" required />
                        </div>
                        <div className="checkout-row">
                            <input type="text" name="city" className="checkout-input" placeholder="City" required />
                            <input type="text" name="state" className="checkout-input" placeholder="State/Province" required />
                        </div>

                        <h3 style={{ marginTop: "2rem" }}>Payment Information</h3>
                        <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", marginBottom: "1rem" }}>
                            You will be redirected to our secure payment partner (Stripe) to complete your purchase safely.
                        </p>

                        {errorMsg && (
                            <div style={{ color: '#e74c3c', padding: '10px', background: 'rgba(231, 76, 60, 0.1)', border: '1px solid #e74c3c', borderRadius: '4px', marginBottom: '1rem' }}>
                                {errorMsg}
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary btn-block" disabled={isLoading} style={{ marginTop: "1rem", opacity: isLoading ? 0.7 : 1 }}>
                            {isLoading ? "Redirecting to Secure Checkout..." : `Proceed to Secure Checkout - $${(cartTotal + shipping).toFixed(2)}`}
                        </button>
                    </form>

                    <div className="order-summary">
                        <h3>Order Summary</h3>
                        <div className="order-items">
                            {cartItems.map((item, idx) => (
                                <div className="order-item" key={idx}>
                                    <div className="order-item-name">
                                        <h4>{item.name}</h4>
                                        <span>Qty: {item.quantity}</span>
                                    </div>
                                    <div>{item.price}</div>
                                </div>
                            ))}
                        </div>
                        <div className="order-item">
                            <span>Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="order-item">
                            <span>Shipping</span>
                            <span>${shipping.toFixed(2)}</span>
                        </div>
                        <div className="order-summary-total">
                            <span>Total</span>
                            <span>${(cartTotal + shipping).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
