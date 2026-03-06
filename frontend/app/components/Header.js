"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const { data: session } = useSession();
    const dropdownRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setLoginOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setLoginError("");
        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (result.error) {
                setLoginError("Invalid email or password");
            } else {
                setLoginOpen(false);
                router.refresh();
            }
        } catch (err) {
            setLoginError("Something went wrong");
        }
    };

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
                            {session ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: 'bold' }}>
                                        Hi, {session.user?.name ? session.user.name.charAt(0).toUpperCase() + session.user.name.slice(1) : "There"}!
                                    </span>
                                    {session.user?.role === 'admin' && (
                                        <Link href="/admin" onClick={() => setMenuOpen(false)} style={{ fontSize: '0.875rem' }}>
                                            Admin Dashboard
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => { signOut(); setMenuOpen(false); }}
                                        style={{ background: 'none', border: 'none', color: 'var(--color-text-main)', cursor: 'pointer', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '500' }}
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="login-dropdown-container" ref={dropdownRef}>
                                    <a
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); setLoginOpen(!loginOpen); }}
                                    >
                                        Login
                                    </a>
                                    <div className={`login-dropdown ${loginOpen ? "open" : ""}`}>
                                        <div className="login-dropdown-header">Welcome Back</div>
                                        <form onSubmit={handleEmailLogin}>
                                            {loginError && <div style={{ color: '#e74c3c', fontSize: '0.8rem', textAlign: 'center', marginBottom: '10px' }}>{loginError}</div>}
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                            <input
                                                type="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                            <button type="submit" className="btn btn-primary btn-block" style={{ padding: '0.6rem' }}>Sign In</button>
                                        </form>

                                        <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '0.8rem' }}>
                                            Don't have an account? <Link href="/login" onClick={() => setLoginOpen(false)}>Sign Up</Link>
                                        </div>

                                        <div className="login-dropdown-divider">
                                            <span>Or</span>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            <button
                                                className="btn btn-secondary btn-block"
                                                style={{ borderColor: '#4285F4', color: '#4285F4', padding: '0.6rem', fontSize: '0.85rem' }}
                                                onClick={() => signIn("google")}
                                            >
                                                Sign in with Google
                                            </button>
                                            <button
                                                className="btn btn-secondary btn-block"
                                                style={{ borderColor: '#1877F2', color: '#1877F2', padding: '0.6rem', fontSize: '0.85rem' }}
                                                onClick={() => signIn("facebook")}
                                            >
                                                Sign in with Facebook
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
