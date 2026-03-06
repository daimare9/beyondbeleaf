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
            <p><strong>In November of 2019</strong>, our two year old daughter was diagnosed with an aggressive and inoperable brain tumor. We were informed that we could expect 3 weeks-3months until she passed away. We were obviously ruined inside but soon promised ourselves we wouldn't give up on her. After extensively researching, we found an amazing surgeon in Memphis, TN who has become family to us. He successfully removed 90% of her tumor 11/25/2019.</p>

            <p>After returning home under orders to begin chemotherapy for the remaining 10%. After the first infusion, she had a severe allergic reaction to the chemotherapy and almost died due to full body toxicity and a bowel intussusception. She was simply no longer a candidate for traditional treatment. It took a year and a half for the tumor to return as big as it was when she was diagnosed and we then fought a multi billion dollar insurance company to have a second surgery approved so the surgeon we trusted could perform her second surgery.</p>

            <p>He successfully removed 90% again and we began researching natural approaches to her treatment. We began applying these natural methods of treatment under the supervision of her medical team and I am proud to say that after 5 years of fighting with everything she had, our daughter was given <strong>CLEAR SCANS</strong> in June of 2023. Out of 21 kids who had the exact same tumor as her, she is the only one who ever got clear scans. The other kids saw minimal shrinkage and/or stability. After the trial ended, every one of those kids' tumor growth exploded and they were all forced back onto pharmaceutical treatment. We were warned by our oncologist that we should expect growth at every follow up scan. But our daughter has maintained clear scans for 3 years now and she is the only one out of 21 kids who did not relapse! Her last scan was the first time that our Oncologist looked at us and finally said he is confident that because of our methods and if we continue what we do, her tumor will never return.</p>

            <p>Unfortunately she has been forced to live with the long term side effects of the one infusion she suffered through and deals with severe neuropathy. Thanks to the Miracle Bundle, she has never needed a pharmaceutical for it! "Medicine" has only one solution for this problem; Gabepentin. NIH just released a study of 26,000 patients who were prescribed this drug and a whopping 29% of them suffered from cognitive decline and early dementia because of it. This is the answer that we accept for ourselves? FOR OUR CHILDREN? Not us. We declined and instead, I formulate two topicals (Triple Threat Miracle Rub + XT Strength Miracle Oil---THE MIRACLE BUNDLE) to relieve her suffering. We have treated her neuropathy successfully this way now for 6 years.</p>

            <p>Not only has she been saved from the terrible side effects of Gabapentin, but her story has saved thousands of others all over the country as well. My personal hero and the man I look up to more than anything is her neurosurgeon. He also uses these topicals for arthritis and publicly endorses their effectiveness. She is one of the only cancer patients who takes absolutely no pharmaceuticals and is thriving!</p>

            <p>Living through fighting brain cancer with my child for 5 years forced me to learn so much and unexpectedly propelled me into my newfound passion; natural wellness and the power that the things put on this earth have to repair and maintain our bodies! So when things calmed down and we got clear scans, I went to school to become certified as a naturopathic practitioner so that I can help as many people as I can with products that are effective, safe, and free of harmful side effects!</p>

            <p>I promised God that if He showed me how to save my child, that I would spend the rest of my life spreading that healing to any and everyone who may find themselves in need of it. True to my word, I am at your service. I own a beautiful natural health apothecary and I work with clients all over the United States on a daily basis. Take a look around, and please don't hesitate to reach out to me if I can be of any assistance at all to you. <strong>God Bless &amp; Be well.</strong></p>
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
