import { useState, useEffect } from "react";
import "./hero.scss";
import { Button } from "../hooks/Button";
import RepairServices from "../repairservice/repair";
import OurProducts from "../ourproducts/ourproduct";
import { Helmet } from "react-helmet-async"; // Import Helmet
import nothing from "../../assets/nothing.png";
import samsung from "../../assets/samsung.png";
import googal from "../../assets/googal.png";
import vivo from "../../assets/vivo.png";

// Slide data
const slides = [
  {
    title: "Up to 50% off on all mobile phones",
    description: "Get the best deals on stylish Electronics. Don't miss out!",
    image: "https://img.freepik.com/free-photo/young-woman-trendy-stylish-glasses-bright-orange-oversized-jacket-white-background-holds-phone-with-blank-white-screen_343596-8188.jpg"
  },
  {
    title: "New Arrivals in home appliances",
    description: "Trendy and stylish Gadgets now available.",
    image: "https://img.freepik.com/free-photo/smiling-woman-holding-shopping-bags_171337-13172.jpg"
  },
  {
    title: "Electronics Mega Sale",
    description: "Up to 60% off on the latest gadgets.",
    image: nothing  // ✅ 
  },
  {
    title: "Samsung Mega Sale",
    description: "Up to 60% off on Samsung gadgets.",
    image: samsung  // ✅
  },
  {
    title: "Google Pixel Launch",
    description: "Explore the latest Google Pixel deals.",
    image: googal   // ✅
  },
  {
    title: "Vivo Smartphone Deals",
    description: "Exclusive offers on Vivo smartphones.",
    image: vivo     // ✅
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

      <Helmet>
        <title>Welcome to VK Electronics | Best Deals and Discounts</title>
        <meta name="description" content="Shop for the best electronics, fashion, and more at VK Electronics. Enjoy up to 60% off on selected items!" />
        <meta name="keywords" content="VK Electronics, electronics, fashion, gadgets, sale, smartphone, home appliances" />
        <meta property="og:title" content="Welcome to VK Electronics | Best Deals and Discounts" />
        <meta property="og:description" content="Explore our latest sales and find great deals on electronics, fashion, and more." />
        <meta property="og:image" content="https://vk-electronics.netlify.app/default-banner-image.jpg" />
        <meta property="og:url" content="https://vk-electronics.netlify.app/" />
      </Helmet>

      <section
        className="hero"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="hero-content">
          <h1>{slides[currentSlide].title}</h1>
          <p>{slides[currentSlide].description}</p>
          <Button text=" View Shop details" />
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
