import React from "react";
import { Link } from "react-router-dom";
import "./fotter.scss";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-logo">
                        <div className="container-heading">VK Electronics</div>
                        <p>Your One-Stop Shop for Electronics & Repairs.</p>
                    </div>
                    <div className="footer-links-container">
                        <div className="footer-links">
                            <div className="container-heading">Quick Links</div>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/smartphone">Smartphone</Link></li>
                                <li><Link to="/electronics">Electronics</Link></li>
                                <li><Link to="/home-appliance"> HomeAppliances</Link></li>
                            </ul>
                        </div>

                        <div className="footer-contact">
                            <div className="container-heading">Contact Us</div>
                            <p>Email: support@vkelectronics.com</p>
                            <p>Phone: +91 98765 43210</p>
                            <p>Address: Bangra Bazar, Lohari Bari, Bhatpar Rani, Deoria, Uttar Pradesh, India</p>
                            <p>274704</p>
                        </div>
                    </div>
                    <div className="footer-social">
                        <div className="container-heading">Follow Us</div>
                        <div className="social-icons">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div>&copy; {new Date().getFullYear()} VK Electronics. All Rights Reserved.</div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
