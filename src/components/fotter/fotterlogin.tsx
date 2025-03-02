import React from "react";
import "./fotter.scss";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Fotter: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-social">
                        <div className="footer-social-container">
                            <h3 className="black">Follow Us</h3>
                            <div className="social-icons">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                            </div>
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

export default Fotter;
