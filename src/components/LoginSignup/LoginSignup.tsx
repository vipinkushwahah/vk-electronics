import React, { useState } from "react";
import axios from "axios";
import "./LoginSignup.scss";
import logo from '../../assets/vklogo.png';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const LoginSignup: React.FC<{
    onLogin: (userId: string, username: string, isShopkeeper: boolean) => void;
}> = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSignup, setIsSignup] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [newPassword, setNewPassword] = useState(""); // For reset password
    const [errorMessage, setErrorMessage] = useState("");  // To display error messages
    const [loading, setLoading] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Email regex

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Validate email using the regex
        if (!emailRegex.test(email)) {
            setErrorMessage("Invalid email format");
            setLoading(false);
            return;
        }

        try {
            let url = "";
            let payload = {};

            if (isForgotPassword) {
                // Reset password request
                if (!newPassword) {
                    setErrorMessage("New password is required");
                    setLoading(false);
                    return;
                }
                url = `${BACKEND_URL}/auth/reset-password`;
                payload = { email, newPassword };
            } else {
                // Login or Signup request
                url = `${BACKEND_URL}/auth/${isSignup ? "signup" : "login"}`;
                payload = isSignup ? { email, username, password } : { email, password };
            }

            const response = await axios.post(url, payload);

            if (isForgotPassword) {
                alert("Password reset successful! You can now log in.");
                setIsForgotPassword(false);
            } else if (isSignup) {
                alert("Signup successful! You can now log in.");
                setIsSignup(false);
            } else {
                alert(response.data.message);
                const { userId, username, isShopkeeper } = response.data;
                onLogin(userId, username, isShopkeeper);
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("Operation failed. Please try again!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-signup">
            <div className="logo">
                <img src={logo} alt="VK Electronics Logo" />
                <div className="heading-login-signup">
                    {isForgotPassword ? "Reset Password" : isSignup ? "Sign Up" : "Log In"}
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                {isForgotPassword ? (
                    <>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        {errorMessage && <p className="error">{errorMessage}</p>}
                        <button type="submit" disabled={loading}>
                            {loading ? "Processing..." : "Reset Password"}
                        </button>
                        <p onClick={() => setIsForgotPassword(false)}>Back to Login</p>
                    </>
                ) : (
                    <>
                        {isSignup && (
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        )}

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        
                        {errorMessage && <p className="error">{errorMessage}</p>}

                        <button type="submit" disabled={loading}>
                            {loading ? "Processing..." : isSignup ? "Sign Up" : "Log In"}
                        </button>

                        <p onClick={() => setIsSignup(!isSignup)}>
                            {isSignup ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
                        </p>

                        <p onClick={() => setIsForgotPassword(true)}>Forgot Password?</p>
                    </>
                )}
            </form>
        </div>
    );
};

export default LoginSignup;
