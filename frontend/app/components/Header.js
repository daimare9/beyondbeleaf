"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { cartCount, setIsCartOpen } = useCart();
    const { data: session } = useSession();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header id="main-header" className={scrolled ? "scrolled" : ""}>
            <div className="container header-container">
                <Link href="/" className="logo">
                    <img src="/original-logo.jpg" alt="ByondBeLeaf Logo" style={{ borderRadius: '4px' }} />
                    <span className="logo-text">ByondBeLeaf</span>
                </Link>
                <button
                    className={`mobile-toggle ${menuOpen ? "active" : ""}`}
                    aria-label="Toggle Navigation"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
                <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
                    <ul>
                        <li>
                            <Link href="/#hero" onClick={() => setMenuOpen(false)}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/#story" onClick={() => setMenuOpen(false)}>
                                Our Story
                            </Link>
                        </li>
                        <li>
                            <Link href="/shop" onClick={() => setMenuOpen(false)}>
                                Shop
                            </Link>
                        </li>
                        <li>
                            <Link href="/#contact-form" onClick={() => setMenuOpen(false)}>
                                Contact
                            </Link>
                        </li>
                        <li>
                            <button
                                className="cart-icon-btn"
                                onClick={() => setIsCartOpen(true)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="9" cy="21" r="1"></circle>
                                    <circle cx="20" cy="21" r="1"></circle>
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                </svg>
                                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                            </button>
                        </li>
                        <li>
                            {session ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: 'bold' }}>
                                        Hi, {session.user.name.charAt(0).toUpperCase() + session.user.name.slice(1)}!
                                    </span>
                                    <Link href="/admin" onClick={() => setMenuOpen(false)} style={{ fontSize: '0.875rem' }}>
                                        Admin Dashboard
                                    </Link>
                                    <button
                                        onClick={() => { signOut(); setMenuOpen(false); }}
                                        style={{ background: 'none', border: 'none', color: 'var(--color-text-main)', cursor: 'pointer', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '500' }}
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link href="/login" onClick={() => setMenuOpen(false)}>
                                    Login
                                </Link>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
