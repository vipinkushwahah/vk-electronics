// import React, { useState } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import { authState } from "../LoginSignup/state";
import "./LoginSignup.scss";
import logo from "../../assets/vklogo.png";
import { useState } from "react";
// import UserManagement from "./UserManagement/UserManagement";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const LoginSignup: React.FC<{ onLogin: (userId: string, username: string, isShopkeeper: boolean) => void; }> = ({ onLogin }) => {
    const [auth, setAuth] = useRecoilState(authState);
    // const [isShopkeeper, setIsShopkeeper] = useState(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const [showpassword, setshowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuth((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuth((prev) => ({ ...prev, loading: true, errorMessage: "" }));

        if (!emailRegex.test(auth.email)) {
            setAuth((prev) => ({ ...prev, errorMessage: "Invalid email format", loading: false }));
            return;
        }
        if (!passwordRegex.test(auth.password)) {
            setAuth((prev) => ({ ...prev, errorMessage: "Invalid password format", loading: false }));
            return;
        }

        try {
            let url = "";
            let payload = {};

            if (auth.authView === "forgotPassword") {
                if (!auth.newPassword) {
                    setAuth((prev) => ({ ...prev, errorMessage: "New password is required", loading: false }));
                    return;
                }
                url = `${BACKEND_URL}/auth/reset-password`;
                payload = { email: auth.email, newPassword: auth.newPassword };
            } else {
                url = `${BACKEND_URL}/auth/${auth.authView === "signup" ? "signup" : "login"}`;

                // Ensure `isShopkeeper` is sent during signup
                payload = auth.authView === "signup"
                    ? {
                        email: auth.email,
                        username: auth.username,
                        password: auth.password,
                        // isShopkeeper // Include isShopkeeper here
                    }
                    : { email: auth.email, password: auth.password };
            }

            const response = await axios.post(url, payload);

            if (auth.authView === "forgotPassword") {
                alert("Password reset successful! You can now log in.");
                setAuth((prev) => ({ ...prev, authView: "login" }));
            } else if (auth.authView === "signup") {
                alert("Signup successful! You can now log in.");
                setAuth((prev) => ({ ...prev, authView: "login" }));
            } else {
                alert(response.data.message);
                const { userId, username, isShopkeeper } = response.data;
                onLogin(userId, username, isShopkeeper);
            }
        } catch (error) {
            console.error("Error:", error);
            setAuth((prev) => ({ ...prev, errorMessage: "User not found. Please try again!" }));
        } finally {
            setAuth((prev) => ({ ...prev, loading: false }));
        }
    };


    return (
        <div className="login-signup">
            <div className="logo">
                <img src={logo} alt="VK Electronics Logo" />
                <div className="heading-login-signup">
                    {auth.authView === "forgotPassword"
                        ? "Reset Password"
                        : auth.authView === "signup"
                            ? "Sign Up"
                            : "Log In"}
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                {auth.authView === "forgotPassword" ? (
                    <>
                        <input type="email" name="email" placeholder="Enter your email" value={auth.email} onChange={handleChange} required />
                        <input type={showpassword ? "text" : "password"} name="newPassword" placeholder="Enter new password" value={auth.newPassword} onChange={handleChange} required />
                        <button className="eye-button" type='button' onClick={()=>setshowPassword(!showpassword)}><i className={showpassword ? "ri-eye-line" : "ri-eye-off-line"}></i></button>
                        {auth.errorMessage && <p className="error">{auth.errorMessage}</p>}
                        <button type="submit" disabled={auth.loading}>{auth.loading ? "Processing..." : "Reset Password"}</button>
                        <p onClick={() => setAuth((prev) => ({ ...prev, authView: "login" }))}>Back to Login</p>
                    </>
                ) : (
                    <>
                        {auth.authView === "signup" && (
                            <input type="text" name="username" placeholder="Username" value={auth.username} onChange={handleChange} required />
                        )}
                        <input type="email" name="email" placeholder="Email" value={auth.email} onChange={handleChange} required />
                        <input type={showpassword ? "text" : "password"} name="password" placeholder="Password" value={auth.password} onChange={handleChange} required />
                        <button className={auth.authView === "signup" ? "eye-button-signup" : "eye-button"} type='button' onClick={()=>setshowPassword(!showpassword)}><i className={showpassword ? "ri-eye-line" : "ri-eye-off-line"}></i></button>
                        {auth.errorMessage && <p className="error">{auth.errorMessage}</p>}
                        <button type="submit" disabled={auth.loading}>{auth.loading ? "Processing..." : auth.authView === "signup" ? "Sign Up" : "Log In"}</button>
                        <p onClick={() => setAuth((prev) => ({ ...prev, authView: auth.authView === "signup" ? "login" : "signup" }))}>
                            {auth.authView === "signup" ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
                        </p>
                        <p onClick={() => setAuth((prev) => ({ ...prev, authView: "forgotPassword" }))}>Forgot Password?</p>
                    </>
                )}
                {/* {auth.authView === "signup" && (
                    <div>
                        <label>
                            <span>Register as Shopkeeper</span>
                            <input
                                type="checkbox"
                                checked={isShopkeeper}
                                onChange={(e) => setIsShopkeeper(e.target.checked)}
                            />
                        </label>
                    </div>
                )} */}
            </form>
            {/* <UserManagement /> */}
        </div>
    );
};

export default LoginSignup;
