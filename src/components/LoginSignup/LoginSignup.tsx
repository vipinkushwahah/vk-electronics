import "./LoginSignup.scss";
import { useRecoilState } from "recoil";
import { authState } from "../LoginSignup/state";
import axios from "axios";
import { useState, useEffect } from "react";
import VanillaTilt from "vanilla-tilt";
// import UserManagement from "./UserManagement/UserManagement";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const LoginSignup: React.FC<{
  onLogin: (userId: string, username: string, isShopkeeper: boolean) => void;
}> = ({ onLogin }) => {
  const [auth, setAuth] = useRecoilState(authState);
  // const [isShopkeeper, setIsShopkeeper] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorFields, setErrorFields] = useState<string[]>([]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  useEffect(() => {
    const boxes = document.querySelectorAll(".box");
    if (boxes.length > 0) {
      VanillaTilt.init(Array.from(boxes) as HTMLElement[], {
        max: 5,
        speed: 10,
        glare: true,
        "max-glare": 0.5,
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuth((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuth((prev) => ({ ...prev, loading: true, errorMessage: "" }));
    setErrorFields([]);

    const errors: string[] = [];
    const errorInputs: string[] = [];

    if (!emailRegex.test(auth.email)) {
      errors.push("Invalid email format");
      errorInputs.push("email");
    }
    if (
      auth.authView !== "forgotPassword" &&
      !passwordRegex.test(auth.password)
    ) {
      errors.push(
        "Invalid password format (must contain uppercase, lowercase, number, special character, 8+ characters)"
      );
      errorInputs.push("password");
    }
    if (auth.authView === "signup" && !auth.username) {
      errors.push("Username is required");
      errorInputs.push("username");
    }
    if (auth.authView === "forgotPassword" && !auth.newPassword) {
      errors.push("New password is required");
      errorInputs.push("newPassword");
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
      setErrorFields(errorInputs);
      setAuth((prev) => ({ ...prev, loading: false }));
      return;
    }

    try {
      let url = "";
      let payload = {};

      if (auth.authView === "forgotPassword") {
        url = `${BACKEND_URL}/auth/reset-password`;
        payload = { email: auth.email, newPassword: auth.newPassword };
      } else {
        url = `${BACKEND_URL}/auth/${
          auth.authView === "signup" ? "signup" : "login"
        }`;

        // Ensure `isShopkeeper` is sent during signup
        payload =
          auth.authView === "signup"
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error:", error);
      if (
        error.response &&
        error.response.status === 404 &&
        auth.authView === "login"
      ) {
        alert("User not found. Redirecting to signup...");
        setAuth((prev) => ({ ...prev, authView: "signup" }));
      } else {
        alert("Something went wrong. Please try again!");
      }
    } finally {
      setAuth((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="LoginSignup-main-container-animation">
      <div className="box">
        <div className="elements code"></div>
        <div className="elements name">
          <div
            className="heading-login-signup"
            onClick={() =>
              setAuth((prev) => {
                const nextView =
                  prev.authView === "login"
                    ? "signup"
                    : prev.authView === "signup"
                    ? "forgotPassword"
                    : "login"; // from forgotPassword → login
                return { ...prev, authView: nextView };
              })
            }
            style={{ cursor: "pointer" }}
            title="Click to switch mode"
          >
            {auth.authView === "forgotPassword"
              ? "Reset Password"
              : auth.authView === "signup"
              ? "Sign Up"
              : "Log In"}
          </div>
        </div>

        <div className="elements content">
          <form onSubmit={handleSubmit}>
            {auth.authView === "forgotPassword" ? (
              <>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={auth.email}
                  onChange={handleChange}
                  required
                  className={errorFields.includes("email") ? "input-error" : ""}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="Enter new password"
                  value={auth.newPassword}
                  onChange={handleChange}
                  required
                  className={
                    errorFields.includes("newPassword") ? "input-error" : ""
                  }
                />
                <button
                  className="eye-button"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={showPassword ? "ri-eye-line" : "ri-eye-off-line"}
                  ></i>
                </button>
                <button type="submit" disabled={auth.loading}>
                  {auth.loading ? "Processing..." : "Reset Password"}
                </button>
                <p
                  onClick={() =>
                    setAuth((prev) => ({ ...prev, authView: "login" }))
                  }
                >
                  Click hear if you want to go back again to login page
                </p>
              </>
            ) : (
              <>
                {auth.authView === "signup" && (
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={auth.username}
                    onChange={handleChange}
                    required
                    className={
                      errorFields.includes("username") ? "input-error" : ""
                    }
                  />
                )}
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={auth.email}
                  onChange={handleChange}
                  required
                  className={errorFields.includes("email") ? "input-error" : ""}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={auth.password}
                  onChange={handleChange}
                  required
                  className={
                    errorFields.includes("password") ? "input-error" : ""
                  }
                />
                <button
                  className={
                    auth.authView === "signup"
                      ? "eye-button-signup"
                      : "eye-button"
                  }
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={showPassword ? "ri-eye-line" : "ri-eye-off-line"}
                  ></i>
                </button>
                <button type="submit" disabled={auth.loading}>
                  {auth.loading
                    ? "Processing..."
                    : auth.authView === "signup"
                    ? "Sign Up"
                    : "Log In"}
                </button>
                <p
                  onClick={() =>
                    setAuth((prev) => ({
                      ...prev,
                      authView: auth.authView === "signup" ? "login" : "signup",
                    }))
                  }
                >
                  {auth.authView === "signup"
                    ? "Already have an account? Log In"
                    : "Don't have an account? Sign Up"}
                </p>
                {/* Forgot Password visible only on login */}
                {auth.authView === "login" && (
                  <p
                    onClick={() =>
                      setAuth((prev) => ({
                        ...prev,
                        authView: "forgotPassword",
                      }))
                    }
                  >
                    Forgot Password?
                  </p>
                )}
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
        </div>
        <div className="card"></div>
      </div>
      {/* <UserManagement /> */}
    </div>
  );
};

export default LoginSignup;
