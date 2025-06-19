import "./App.scss";
import { Navbar } from "./components/nevbar/navbar";
import "remixicon/fonts/remixicon.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import ProductList from "./components/products/productlist/productlist";
import { Hero } from "./components/Hero/hero";
import GadgetsList from "./components/electronic/electronic";
import HomeAppliances from "./components/homeappliance/homeappliance";
import Footer from "./components/fotter/fotter";
import AddProduct from "./components/addproduct/AddProduct";
import ProductManagement from "./components/product/ProductManagement";
import ProductDetails from "./components/productdetails/productdetails";
import { HelmetProvider } from "react-helmet-async";
import Contact from "./components/contect/contect";
import React, { useState } from "react";
import ReviewComponent from "./components/repairservice/review/review";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import RepairServices from "./components/repairservice/repair";
import Header from "./components/LoginSignup/header/header";
import FotterLogin from "./components/fotter/fotterlogin";

// ✅ Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface User {
  userId: string | null;
  username: string | null;
  isShopkeeper: boolean;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User>({
    userId: null,
    username: null,
    isShopkeeper: false,
  });

  const handleLogin = (userId: string, username: string, isShopkeeper: boolean) => {
    setUser({
      userId,
      username,
      isShopkeeper,
    });
  };

  const handleLogout = () => {
    setUser({
      userId: null,
      username: null,
      isShopkeeper: false,
    });
  };

  return (
    <HelmetProvider>
      <Router>
        <MainApp
          user={user}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
        />
        {/* ✅ Toast Container at top level */}
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </HelmetProvider>
  );
};

interface MainAppProps {
  user: User;
  handleLogin: (
    userId: string,
    username: string,
    isShopkeeper: boolean
  ) => void;
  handleLogout: () => void;
}

const MainApp: React.FC<MainAppProps> = ({
  user,
  handleLogin,
  handleLogout,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Login page override for /reviews
  if (location.pathname === "/reviews" && !user.userId) {
    return (
      <div className="LoginSignup-main-container">
        <Header />
        <LoginSignup onLogin={handleLogin} />
        <FotterLogin />
      </div>
    );
  }

  return (
    <>
      <Navbar 
        isShopkeeper={user.isShopkeeper} 
        username={user.username}
        onLogout={handleLogout}
      />
      <div className="App">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/smartphone" element={<ProductList />} />
          <Route path="/electronics" element={<GadgetsList />} />
          <Route path="/home-appliance" element={<HomeAppliances />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/contect" element={<Contact />} />
          <Route path="/repair-services" element={<RepairServices />} />
          <Route
            path="/login"
            element={
              <div className="LoginSignup-main-container-route">
                <LoginSignup
                  onLogin={(id, name, isShopkeeper) => {
                    handleLogin(id, name, isShopkeeper);
                    if (isShopkeeper) {
                      navigate("/manage-products");
                    } else {
                      navigate("/");
                    }
                  }}
                />
              </div>
            }
          />
          <Route
            path="/reviews"
            element={
              <ReviewComponent
                productId="60f3b3b3b3b3b3b3b3b3b3b3"
                userId={user.userId || ""}
                username={user.username || ""}
                isShopkeeper={user.isShopkeeper}
              />
            }
          />

          {/* ✅ Shopkeeper-only routes */}
          {user.isShopkeeper && (
            <>
              <Route 
                path="/add-product" 
                element={<AddProduct />} 
              />
              <Route 
                path="/manage-products" 
                element={
                  <ProductManagement 
                    user={{
                      userId: user.userId || "",
                      username: user.username || "",
                      isShopkeeper: user.isShopkeeper
                    }} 
                  />
                } 
              />
            </>
          )}

          {/* ✅ Redirect to home for any unknown routes */}
          <Route path="*" element={<Hero />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;