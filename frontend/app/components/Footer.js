"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer id="contact">
            <div className="container footer-container">
                <div className="footer-brand">
                    <Link href="/" className="logo footer-logo">
                        <img src="/original-logo.jpg" alt="ByondBeLeaf Logo" style={{ borderRadius: '4px' }} />
                        <span className="logo-text">ByondBeLeaf</span>
                    </Link>
                    <p>Nature's Masterpiece, Your Healing.</p>
                </div>
                <div className="footer-links">
                    <h4>Contact</h4>
                    <ul>
                        <li>
                            <a href="mailto:KScott.NaturalHealth@gmail.com">
                                KScott.NaturalHealth@gmail.com
                            </a>
                        </li>
                        <li>
                            <a href="tel:+19899844066">Text us: (989) 984-4066</a>
                        </li>
                        <li>Hours: 9am-5pm M-F</li>
                    </ul>
                </div>
                <div className="footer-links">
                    <h4>Explore</h4>
                    <ul>
                        <li>
                            <Link href="/#hero">Home</Link>
                        </li>
                        <li>
                            <Link href="/shop">Shop All Products</Link>
                        </li>
                        <li>
                            <Link href="#">Loyalty Program</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom text-center">
                <p>&copy; 2026 ByondBeLeaf. All Rights Reserved.</p>
                <p>
                    Use The Live Chat Feature at the bottom right corner of your screen to
                    ask any questions!
                </p>
            </div>
        </footer>
    );
}
