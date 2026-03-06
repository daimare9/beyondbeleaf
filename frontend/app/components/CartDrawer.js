"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
    const {
        cartItems,
        isCartOpen,
        setIsCartOpen,
        removeFromCart,
        updateQuantity,
        cartTotal,
    } = useCart();

    return (
        <>
            <div
                className={`cart-overlay ${isCartOpen ? "open" : ""}`}
                onClick={() => setIsCartOpen(false)}
            ></div>
            <div className={`cart-drawer ${isCartOpen ? "open" : ""}`}>
                <div className="cart-drawer-header">
                    <h3>Your Healing Cart</h3>
                    <button
                        className="cart-close-btn"
                        onClick={() => setIsCartOpen(false)}
                    >
                        &times;
                    </button>
                </div>

                <div className="cart-items">
                    {cartItems.length === 0 ? (
                        <div className="cart-empty">
                            Your cart is currently empty.
                            <br />
                            <Link
                                href="/shop"
                                style={{ marginTop: "1rem", display: "inline-block" }}
                                onClick={() => setIsCartOpen(false)}
                            >
                                Start Healing
                            </Link>
                        </div>
                    ) : (
                        cartItems.map((item, idx) => (
                            <div className="cart-item" key={idx}>
                                <div className="cart-item-image">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="cart-item-details">
                                    <h4>{item.name}</h4>
                                    <div className="cart-item-price">{item.price}</div>
                                    <div className="cart-item-qty">
                                        <button
                                            onClick={() =>
                                                updateQuantity(item.name, item.quantity - 1)
                                            }
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() =>
                                                updateQuantity(item.name, item.quantity + 1)
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        className="cart-remove-btn"
                                        onClick={() => removeFromCart(item.name)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-total">
                            <span>Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <Link
                            href="/checkout"
                            className="btn btn-primary btn-block"
                            style={{ textAlign: "center" }}
                            onClick={() => setIsCartOpen(false)}
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
