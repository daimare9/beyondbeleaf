"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("products");

    // Simulated data for the dashboard
    const [products, setProducts] = useState([
        { id: 1, name: "The Miracle Bundle", price: "$90.00", stock: 15 },
        { id: 2, name: "Extra Strength Miracle Oil", price: "$60.00", stock: 8 },
    ]);

    const [orders, setOrders] = useState([
        { id: "ORD-1234", customer: "John Doe", total: "$95.00", status: "Processing" },
        { id: "ORD-1235", customer: "Jane Smith", total: "$120.00", status: "Shipped" },
    ]);

    if (status === "loading") return <div className="container" style={{ paddingTop: '120px' }}>Loading...</div>;

    // Simple auth check - normally you'd check a role attached to the session
    if (!session) {
        router.push("/login");
        return null;
    }

    const handleAddProduct = (e) => {
        e.preventDefault();
        alert("Product added successfully (UI simulation)");
    };

    return (
        <div className="container" style={{ paddingTop: "120px", paddingBottom: "var(--spacing-xl)" }}>
            <div className="section-header">
                <span className="section-subtitle">Admin Portal</span>
                <h2>Store Dashboard</h2>
                <p>Welcome back, Administrator. What would you like to manage?</p>
            </div>

            <div style={{ display: "flex", gap: "var(--spacing-md)", marginBottom: "var(--spacing-lg)" }}>
                <button
                    className={`btn ${activeTab === "products" ? "btn-primary" : "btn-secondary"}`}
                    onClick={() => setActiveTab("products")}
                >
                    Manage Products
                </button>
                <button
                    className={`btn ${activeTab === "orders" ? "btn-primary" : "btn-secondary"}`}
                    onClick={() => setActiveTab("orders")}
                >
                    Review Orders
                </button>
            </div>

            {activeTab === "products" && (
                <div style={{ background: "var(--color-bg-panel)", padding: "var(--spacing-md)", borderRadius: "var(--radius-md)" }}>
                    <h3>Inventory List</h3>
                    <table style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ borderBottom: "1px solid var(--color-border)", textAlign: "left" }}>
                                <th style={{ padding: "10px" }}>ID</th>
                                <th style={{ padding: "10px" }}>Name</th>
                                <th style={{ padding: "10px" }}>Price</th>
                                <th style={{ padding: "10px" }}>Stock</th>
                                <th style={{ padding: "10px" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p) => (
                                <tr key={p.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                                    <td style={{ padding: "10px" }}>{p.id}</td>
                                    <td style={{ padding: "10px" }}>{p.name}</td>
                                    <td style={{ padding: "10px" }}>{p.price}</td>
                                    <td style={{ padding: "10px" }}>{p.stock}</td>
                                    <td style={{ padding: "10px" }}>
                                        <button style={{ color: "var(--color-accent)", background: "none", border: "none", cursor: "pointer" }}>Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h3 style={{ marginTop: "2rem", marginBottom: "1rem" }}>Add New Product</h3>
                    <form onSubmit={handleAddProduct} style={{ maxWidth: "500px", display: "flex", flexDirection: "column", gap: "10px" }}>
                        <input type="text" placeholder="Product Name" className="checkout-input" required />
                        <input type="text" placeholder="Price (e.g. 50.00)" className="checkout-input" required />
                        <textarea placeholder="Description" rows="3" className="checkout-input" required></textarea>
                        <input type="text" placeholder="Image URL" className="checkout-input" required />
                        <button type="submit" className="btn btn-primary" style={{ marginTop: "10px" }}>Save Product</button>
                    </form>
                </div>
            )}

            {activeTab === "orders" && (
                <div style={{ background: "var(--color-bg-panel)", padding: "var(--spacing-md)", borderRadius: "var(--radius-md)" }}>
                    <h3>Recent Orders</h3>
                    <table style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ borderBottom: "1px solid var(--color-border)", textAlign: "left" }}>
                                <th style={{ padding: "10px" }}>Order ID</th>
                                <th style={{ padding: "10px" }}>Customer</th>
                                <th style={{ padding: "10px" }}>Total</th>
                                <th style={{ padding: "10px" }}>Status</th>
                                <th style={{ padding: "10px" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((o) => (
                                <tr key={o.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                                    <td style={{ padding: "10px" }}>{o.id}</td>
                                    <td style={{ padding: "10px" }}>{o.customer}</td>
                                    <td style={{ padding: "10px" }}>{o.total}</td>
                                    <td style={{ padding: "10px" }}>
                                        <span style={{
                                            padding: "4px 8px",
                                            borderRadius: "4px",
                                            background: o.status === "Shipped" ? "var(--color-primary)" : "rgba(207, 168, 98, 0.2)",
                                            color: o.status === "Shipped" ? "#fff" : "var(--color-accent)",
                                            fontSize: "0.85rem"
                                        }}>{o.status}</span>
                                    </td>
                                    <td style={{ padding: "10px" }}>
                                        <button style={{ color: "var(--color-text-main)", background: "none", border: "none", cursor: "pointer" }}>View Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
