import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-outer">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">FixBengaluru</h1>
          <p className="hero-tagline">Empowering Bengaluru citizens to improve their neighborhoods.<br />Report civic issues directly to your MLA.</p>
          <Link to="/report" className="hero-cta">Report an Issue</Link>
        </div>
        <div className="hero-bg" aria-hidden="true">
          {/* Optionally add a cityscape SVG or image here for more visual appeal */}
        </div>
      </section>

      <section className="how-it-works-section">
        <h2>How It Works</h2>
        <div className="steps-grid">
          <div className="step">
            <div className="step-icon">📍</div>
            <div className="step-title">1. Select Area</div>
            <div className="step-desc">Choose your Bengaluru area or ward to localize your report.</div>
          </div>
          <div className="step">
            <div className="step-icon">📝</div>
            <div className="step-title">2. Describe Issue</div>
            <div className="step-desc">Fill in details, add a photo, and submit your civic concern.</div>
          </div>
          <div className="step">
            <div className="step-icon">📤</div>
            <div className="step-title">3. Submit</div>
            <div className="step-desc">Your report is sent to the relevant MLA for action.</div>
          </div>
          <div className="step">
            <div className="step-icon">✅</div>
            <div className="step-title">4. Track Progress</div>
            <div className="step-desc">Admins update the status as issues are addressed.</div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>Why FixBengaluru?</h2>
        <p>
          FixBengaluru is a community-driven platform to help citizens raise civic issues and get them resolved efficiently. By connecting residents directly with their MLAs, we aim to make Bengaluru a better place for everyone.
        </p>
        {/* Optionally add a Bengaluru city image or illustration here */}
      </section>
    </div>
  );
}

export default Home; 