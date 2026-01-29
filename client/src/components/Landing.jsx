import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import heroImg from "../assets/Rectangle 279.png";
import aboutMain from "../assets/Rectangle 287.png";
import aboutSmall from "../assets/Rectangle 286.png";
import whyImg from "../assets/Rectangle 211.png";

import p1 from "../assets/Rectangle 229.png";
import p2 from "../assets/Rectangle 228.png";
import p3 from "../assets/Rectangle 213.png";

import g1 from "../assets/Rectangle 215.png";
import g2 from "../assets/Rectangle 220.png";

/* PROFILE IMAGES */
import newProfile from "../assets/new.jpeg";
import oldProfile from "../assets/old.jpeg";

export default function Landing({ content }) {
  const navigate = useNavigate();

  /* ================= PRODUCT SLIDER ================= */
  const products = [p1, p2, p3];
  const [index, setIndex] = useState(0);

  const AUTO_PLAY_TIME = 2500;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % products.length);
    }, AUTO_PLAY_TIME);
    return () => clearInterval(interval);
  }, []);

  const prev = () =>
    setIndex((index - 1 + products.length) % products.length);
  const next = () =>
    setIndex((index + 1) % products.length);

  const companies =
    content.companies || [
      "BBC",
      "TIME",
      "The New York Times",
      "CNBC",
      "Forbes",
      "Bloomberg",
    ];

  return (
    <>
      {/* EDIT BUTTON */}
      <button className="edit-btn" onClick={() => navigate("/edit")}>
        Edit Content
      </button>

      {/* ================= HERO ================= */}
      <section className="section hero">
        <div className="logo">LOGO</div>

        <div className="hero-image-wrapper">
          <img src={heroImg} className="hero-image" alt="Hero" />

          <div className="stats-box">
            <p className="big">650k</p>
            <span>Subscribers</span>
            <div className="line" />
            <p className="big">5000</p>
            <span>Posts</span>
          </div>
        </div>

        {/* BUSINESS NAME */}
        <h1 className="business-name">{content.businessName}</h1>

        {/* ACTION BUTTONS */}
        <div className="business-actions">
          <button className="subscribe-btn">Subscribe</button>
          <button className="message-btn">Message</button>
        </div>

        {/* REACH US */}
        <div className="reach-us-inline">
          <p className="reach-title">Reach us</p>
          <div className="reach-icons">
            <span>📱</span>
            <span>📞</span>
            <span>✉️</span>
            <span>📍</span>
          </div>
        </div>

        {/* ================= AUTO MOVING COMPANIES ================= */}
        <div className="companies-wrapper">
          <div className="companies-track">
            {companies.map((company, i) => (
              <span key={i} className="company-name">
                {company}
              </span>
            ))}

            {/* duplicate for seamless loop */}
            {companies.map((company, i) => (
              <span key={`dup-${i}`} className="company-name">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="section about">
        <div className="about-left">
          <h2>About Company</h2>
          <p className="about-text">{content.about}</p>
        </div>

        <div className="about-right">
          <div className="about-image-wrapper">
            <img src={aboutMain} className="about-main-img" alt="About" />
            <img src={aboutSmall} className="about-overlay-img" alt="Overlay" />
          </div>
        </div>
      </section>

      {/* ================= WHY ================= */}
      <section
        className="section why full-width"
        style={{ backgroundImage: `url(${whyImg})` }}
      >
        <div className="why-overlay">
          <h2>Why Choose Us</h2>
          <p className="word-animate">
  {content.why.split(" ").map((word, i) => (
    <span
      key={i}
      style={{ animationDelay: `${i * 0.15}s` }}
      className="word"
    >
      {word}&nbsp;
    </span>
  ))}
</p>

        </div>
      </section>

      {/* ================= OUR PRODUCT ================= */}
      <section className="section product full-width">
        <h2 className="center-title">OUR PRODUCT</h2>

        <div className="carousel">
          <button className="carousel-arrow left" onClick={prev}>❮</button>

          <div className="carousel-track">
            {products.map((img, i) => {
              let className = "carousel-item";
              if (i === index) className += " active";
              else if (i === (index - 1 + products.length) % products.length)
                className += " prev";
              else if (i === (index + 1) % products.length)
                className += " next";

              return (
                <img key={i} src={img} className={className} alt="Product" />
              );
            })}
          </div>

          <button className="carousel-arrow right" onClick={next}>❯</button>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="section gallery">
        <h2 className="center-title">OUR GALLERY</h2>

        <div className="gallery-grid">
          {[g1, g2].map((img, i) => {
            const profilePic = i === 0 ? newProfile : oldProfile;

            return (
              <div className="gallery-card" key={i}>
                <img src={img} alt="Gallery" />
                <div className="gallery-overlay" />

                <div className="gallery-top">
                  <div className="gallery-avatar-wrapper">
                    <div
                      className="gallery-avatar-bg"
                      style={{ backgroundImage: `url(${profilePic})` }}
                    />
                    <img src={profilePic} alt="profile" className="gallery-avatar" />
                  </div>

                  <div>
                    <p className="gallery-name">MYMUS</p>
                    <p className="gallery-handle">@mymus_off</p>
                  </div>
                </div>

                <div className="gallery-bottom">
                  <p className="gallery-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>

                  <div className="gallery-actions">
                    <span>❤️ 26</span>
                    <span>💬 03</span>
                    <span>✈️</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="thanks">Thank you! Visit Again</p>
      </section>
    </>
  );
}
