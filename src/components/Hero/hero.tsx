import { useState, useEffect } from "react";
import "./hero.scss";
import { Button } from "../hooks/Button";
import RepairServices from "../repairservice/repair";
import OurProducts from "../ourproducts/ourproduct";

// Slide data
const slides = [
  {
    title: "Up to 50% off on all Men's Wear",
    description: "Get the best deals on stylish outfits. Don't miss out!",
    image: "https://img.freepik.com/free-photo/young-woman-trendy-stylish-glasses-bright-orange-oversized-jacket-white-background-holds-phone-with-blank-white-screen_343596-8188.jpg"
  },
  {
    title: "New Arrivals in Women's Fashion",
    description: "Trendy and stylish outfits now available.",
    image: "https://img.freepik.com/free-photo/smiling-woman-holding-shopping-bags_171337-13172.jpg"
  },
  {
    title: "Electronics Mega Sale",
    description: "Up to 60% off on the latest gadgets.",
    image: "https://img.freepik.com/free-photo/handsome-man-wearing-glasses-denim-shirt-standing-gray-wall_171337-10814.jpg"
  },
  {
    title: "Electronics Mega Sale",
    description: "Up to 60% off on the latest gadgets.",
    image: "https://img.freepik.com/free-photo/handsome-man-wearing-glasses-denim-shirt-standing-gray-wall_171337-10814.jpg"
  },
  {
    title: "Electronics Mega Sale",
    description: "Up to 60% off on the latest gadgets.",
    image: "https://img.freepik.com/free-photo/handsome-man-wearing-glasses-denim-shirt-standing-gray-wall_171337-10814.jpg"
  },
  {
    title: "Electronics Mega Sale",
    description: "Up to 60% off on the latest gadgets.",
    image: "https://img.freepik.com/free-photo/handsome-man-wearing-glasses-denim-shirt-standing-gray-wall_171337-10814.jpg"
  }
];

const services = [
  {
    title: "Easy replacement",
    icon: "ri-loop-right-line"
  },
  {
    title: "Wholesale Price",
    icon: "ri-discount-percent-line"
  },
  {
    title: "Easy-Repair Service",
    icon: "ri-24-hours-line"
  },
  {
    title: "Customer Support",
    icon: "ri-customer-service-2-line"
  }
];

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 4 seconds (stops on hover)
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(services.length / 2));
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [services.length]);

  const getVisibleServices = () => {
    return services.slice(currentIndex * 2, currentIndex * 2 + 2);
  };

  return (
    <div>
      <section
        className="hero"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="hero-content">
          <h1>{slides[currentSlide].title}</h1>
          <p>{slides[currentSlide].description}</p>
          <Button text="Order Now" />
        </div>

        <div className="hero-image-container">
          <img src={slides[currentSlide].image} alt="Shopping Sale" className="hero-image" />
        </div>

        {/* Dots Navigation */}
        <div className="dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </section>
      <div className="product-service">
        {getVisibleServices().map((service, index) => (
          <div key={index} className="product-service_list">
            <i className={`product-service_list-icon ${service.icon}`}></i>
            <div className="product-service_text">{service.title}</div>
          </div>
        ))}
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
