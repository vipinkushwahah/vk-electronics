import React, { useEffect } from 'react';
import { Shield, Award, Users } from 'lucide-react';
import './about.scss';

const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = 'About Us - Vivek Mobile Care';
  }, []);

  return (
    <div className="about-section">
      <div className="about-container">
        <div className="about-content">
          <h1 className="about-heading">About Vivek Mobile Care</h1>
          <p className="about-subheading">
            We are your trusted destination for quality refurbished mobile phones and laptops.
            With years of experience in the industry, we provide certified pre-owned devices
            that combine quality with affordability.
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <Shield className="feature-icon" />
              <h3 className="feature-title">Quality Assured</h3>
              <p className="feature-description">Every device undergoes rigorous testing</p>
            </div>
            <div className="feature-card">
              <Award className="feature-icon" />
              <h3 className="feature-title">6-Month Warranty</h3>
              <p className="feature-description">Peace of mind with every purchase</p>
            </div>
            <div className="feature-card">
              <Users className="feature-icon" />
              <h3 className="feature-title">Expert Support</h3>
              <p className="feature-description">Dedicated team at your service</p>
            </div>
          </div>

          <div className="our-story">
            <h2 className="story-title">Our Story</h2>
            <p>
              Founded with a vision to make premium technology accessible to everyone,
              Vivek Mobile Care has grown to become a trusted name in the refurbished
              electronics market.
            </p>
            <p>
              We believe in sustainable technology consumption and do our part in reducing
              electronic waste by giving premium devices a second life while maintaining
              their quality and performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
