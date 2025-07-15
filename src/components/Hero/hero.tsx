import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Phone, Star, TrendingUp } from 'lucide-react';
import './hero.scss';
import RepairServices from '../repairservice/repair';
import OurProducts from '../ourproducts/ourproduct';

const HeroSection: React.FC = () => {
  return (
    <div>
    <div className="hero-container">
      {/* Background */}
      <div className="hero-bg-overlay">
        <div className="hero-bg-image"></div>
        <div className="hero-gradient-overlay"></div>
      </div>

      <div className="hero-content">
        <div className="hero-grid">
          <div className="hero-text animate-slide-up">
            <h1 className="hero-title">
              Premium Tech, <br />
              <span className="highlight">Refreshed</span> Prices
            </h1>
            <p className="hero-subtitle">
              Get certified refurbished smartphones and laptops with warranty and assured quality at Shubham Mobile Care.
            </p>

            <div className="hero-buttons">
              <Link to="/smartphone" className="btn btn-primary">
                Shop Now
              </Link>
              <Link to="/sell" className="btn btn-accent">
                Sell Your Device
              </Link>
            </div>

            <div className="trust-badges">
              <div className="badge">
                <ShieldCheck size={20} className="icon" />
                <span>6-Month Warranty</span>
              </div>
              <div className="badge">
                <Star size={20} className="icon" />
                <span>Quality Assured</span>
              </div>
              <div className="badge">
                <Phone size={20} className="icon" />
                <span>Certified Devices</span>
              </div>
              <div className="badge">
                <TrendingUp size={20} className="icon" />
                <span>Best Market Prices</span>
              </div>
            </div>
          </div>

          <div className="device-mockups">
            <div className="mockup-container">
              {/* Floating phone mockup */}
              <div className="floating-phone">
                <div className="glass-mockup">
                  <img
                    src="https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="iPhone"
                    className="mockup-image"
                  />
                </div>
              </div>

              {/* Main device mockup */}
              <div className="main-mockup">
                <img
                  src="https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Samsung Galaxy"
                  className="mockup-image"
                />
              </div>

              {/* Floating laptop mockup */}
              <div className="floating-laptop">
                <div className="glass-mockup">
                  <img
                    src="https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="MacBook"
                    className="mockup-image"
                  />
                </div>
              </div>

              {/* Floating fridge mockup */}
              <div className="floating-fridge">
                <div className="glass-mockup">
                  <img
                    src="https://similarpng.com/_next/image?url=https%3A%2F%2Fimage.similarpng.com%2Ffile%2Fsimilarpng%2Fvery-thumbnail%2F2020%2F05%2FOpen-Refrigerator-full-of-food-PNG.png&w=3840&q=75"
                    alt="Fridge"
                    className="mockup-image"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
    <div>
        <RepairServices />
      </div>
      <div>
        <OurProducts />
      </div>
    </div>
  );
};

export default HeroSection;
