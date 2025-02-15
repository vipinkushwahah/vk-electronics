import { useState } from "react";
import emailjs from '@emailjs/browser';
import "./contect.scss";
import QRCodeComponent from "../qrcode/qrcode";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        message: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Update the type for event in handleChange
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Update the type for event in handleSubmit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // EmailJS Integration
        emailjs
            .send(
                "service_6s5sicb", // Replace with your EmailJS service ID
                "template_7v1kd9h", // Replace with your EmailJS template ID
                formData,
                "RGfk7TIqeb7n_aoEj" // Replace with your EmailJS user ID
            )
            .then(
                (result) => {
                    console.log("Message sent:", result.text);
                    setIsSubmitted(true);
                },
                (error) => {
                    console.error("Error sending message:", error);
                }
            );
    };


    return (
        <div>
            <div>
                <img
                    className="main_image"
                    src=""
                    alt="main"
                />
            </div>
            <div className="contact-container">
                {isSubmitted ? (
                    <div className="contact-thankyou">
                        Thank you for your message! I'll get back to you soon.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="contact-title">Let's work together</div>
                        <div className="contact-title-paragraph">
                            "mobile selling and reparing shop"
                        </div>
                        <div className="contact-title-paragraph-form">
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Phone:</label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    placeholder="Phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="message" className="form-label">Message:</label>
                            <textarea
                                id="message"
                                name="message"
                                placeholder="Message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="form-textarea"
                            ></textarea>
                        </div>

                        <button type="submit" className="form-button">
                            Send Message
                        </button>
                    </form>
                )}
                <div className="contact-info-container">
                    <div className="contact-info-item">
                        <div className="contact-info-icon">
                            <i className="ri-phone-fill"></i>
                        </div>
                        <div className="contact-info-details">
                            <div className="contact-info-title">Phone</div>
                            <div className="contact-info-value">(+91) 7420 8683 46</div>
                        </div>
                    </div>

                    <div className="contact-info-item">
                        <div className="contact-info-icon">
                            <i className="ri-mail-fill"></i>
                        </div>
                        <div className="contact-info-details">
                            <div className="contact-info-title">Email</div>
                            <div className="contact-info-value">vkelectronics@gmail.com</div>
                        </div>
                    </div>

                    <div className="contact-info-item">
                        <div className="contact-info-icon">
                            <i className="ri-map-pin-fill"></i>
                        </div>
                        <div className="contact-info-details">
                            <div className="contact-info-title">Address</div>
                            <div className="contact-info-value">Bangra, Deoria, Uttar-Pradesh -274509</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contact-map">
                <h3 className="map-title">📍 Find Us on Google Maps</h3>
                <div className="map-container">
                    <iframe
                        title="Store Location"
                        src="https://www.google.com/maps/embed?pb=!4v1739609120394!6m8!1m7!1spxfgliH22OvF1mjLsA3bZA!2m2!1d26.33508912044648!2d84.10975621594844!3f209.53424!4f0!5f0.7820865974627469"
                        width="100%"
                        height="300"
                        style={{ border: "none", borderRadius: "10px" }}
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
            <QRCodeComponent />
        </div>
    );
};

export default Contact;
