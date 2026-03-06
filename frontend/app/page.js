"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import ProductCard from "./components/ProductCard";

export default function Home() {
  const featuredProducts = [
    {
      name: "The Miracle Bundle",
      image: "bundle.png",
      description: "Our complete 3-step healing system. Designed to transform your wellness journey naturally.",
      price: "$90.00"
    },
    {
      name: "Extra Strength Miracle Oil",
      image: "https://static.wixstatic.com/media/229c91_526aa12afa3842a9a081cf5fc82290c4~mv2.png",
      description: "Formulated for deep tissue penetration and fast-acting relief.",
      price: "$60.00"
    },
    {
      name: '"Triple Threat" Miracle Rub',
      image: "https://static.wixstatic.com/media/229c91_bf7f4eaa4a5a4abb8e902cb4b7b07326f002.jpg",
      description: "A soothing, powerful balm for targeted application.",
      price: "$65.00"
    }
  ];

  // Simple scroll animation hook
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section id="hero" className="hero-section">
        <div className="hero-bg" style={{ backgroundImage: "url('/hero-bg.png')" }}></div>
        <div className="container">
          <div className="hero-content">
            <span className="section-subtitle">Premium Natural Healing</span>
            <h1>Nature's Masterpiece,<br />Your Healing.</h1>
            <p>
              Discover the power of organic, plant-based topicals crafted with
              love, purpose, and uncompromising purity.
            </p>
            <Link href="/shop" className="btn btn-primary">
              Discover The Miracle
            </Link>
          </div>
        </div>
      </section>

      <section id="story" className="section-padding">
        <div className="container animate-on-scroll fade-up">
          <div className="section-header text-center">
            <span className="section-subtitle">Our Journey</span>
            <h2>Rooted in Faith &amp; Family</h2>
          </div>
          <div className="story-text">
            <p><strong>ByondBeLeaf</strong> was founded with a single powerful mission: to relieve suffering using the natural medicine God provided. Our journey began when our founder's mother received a devastating diagnosis with a slim survival rate. Seeking a better way, a divine dream led to the creation of the <em>Miracle Products</em>.</p>
            <p>We believe in the power of faith, the purity of nature, and the importance of helping others. That's why proceeds from every sale go towards our Blessing Box fund—providing our natural products to pediatric cancer patients at no cost to their families.</p>
          </div>
        </div>
      </section>

      <section id="products" className="section-padding products-section">
        <div className="container animate-on-scroll fade-up">
          <div className="section-header text-center">
            <span className="section-subtitle">Core Collection</span>
            <h2>Our Incredible Product Line</h2>
            <p>Targeted natural relief, formulated for maximum absorption.</p>
          </div>
          <div className="product-grid">
            {featuredProducts.map((product, idx) => (
              <ProductCard key={idx} product={product} />
            ))}
          </div>
          <div className="text-center" style={{ marginTop: "3rem" }}>
            <Link href="/shop" className="btn btn-outline-primary">
              View Full Shop
            </Link>
          </div>
          <div className="transparency-note text-center animate-on-scroll fade-up">
            <p><em>Our complete ingredient lists are always printed clearly on every product label. Full ingredient transparency is always available upon request!</em></p>
            <p className="fda-disclaimer">These statements have not been evaluated by the FDA. Our products are not intended to diagnose, treat, cure, or prevent any disease!</p>
          </div>
        </div>
      </section>

      <section id="banner" className="banner text-center">
        <div className="container animate-on-scroll scale-in">
          <h2>Support Our Cause</h2>
          <p>Every purchase supports a family battling pediatric cancer.</p>
          <Link href="/#story" className="btn btn-outline-light">Learn More</Link>
        </div>
      </section>

      <section id="contact-form" className="section-padding">
        <div className="container animate-on-scroll fade-up">
          <div className="section-header text-center">
            <span className="section-subtitle">Reach Out</span>
            <h2>Contact Us</h2>
            <p>Have questions about natural healing or our products? We're here for you.</p>
          </div>
          <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Message sent (UI simulation)') }}>
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <textarea rows="5" placeholder="Your Message" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
