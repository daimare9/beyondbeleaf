"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (result.error) {
                setError("Invalid email or password");
            } else {
                router.push("/");
                router.refresh();
            }
        } catch (err) {
            setError("Something went wrong");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <span className="section-subtitle">Account Portal</span>
                <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
                <form onSubmit={handleSubmit}>
                    {error && (
                        <div style={{ color: '#e74c3c', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
                            {error}
                        </div>
                    )}
                    {!isLogin && (
                        <input
                            type="text"
                            className="auth-input"
                            placeholder="Full Name"
                            required
                        />
                    )}
                    <input
                        type="email"
                        className="auth-input"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="auth-input"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn btn-primary btn-block">
                        {isLogin ? "Sign In" : "Sign Up"}
                    </button>
                </form>
                <div className="auth-footer">
                    {isLogin ? (
                        <>
                            Don't have an account?{" "}
                            <Link href="#" onClick={(e) => { e.preventDefault(); setIsLogin(false); }}>
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <Link href="#" onClick={(e) => { e.preventDefault(); setIsLogin(true); }}>
                                Sign In
                            </Link>
                        </>
                    )}
                </div>

                <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
                    <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>Or continue with</p>
                    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                        <button
                            className="btn btn-secondary btn-block"
                            style={{ borderColor: '#4285F4', color: '#4285F4' }}
                            onClick={() => signIn("google")}
                        >
                            Sign in with Google
                        </button>
                        <button
                            className="btn btn-secondary btn-block"
                            style={{ borderColor: '#1877F2', color: '#1877F2' }}
                            onClick={() => signIn("facebook")}
                        >
                            Sign in with Facebook
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
