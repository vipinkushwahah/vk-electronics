import './App.scss';
import { Navbar } from './components/nevbar/navbar';
import "remixicon/fonts/remixicon.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ProductList from './components/products/productlist/productlist';
import { Hero } from './components/Hero/hero';
import GadgetsList from './components/electronic/electronic';
import HomeAppliances from './components/homeappliance/homeappliance';
import Footer from './components/fotter/fotter';
import AddProduct from './components/addproduct/AddProduct';
import ProductManagement from './components/product/ProductManagement';
import ProductDetails from './components/productdetails/productdetails';
import { HelmetProvider } from 'react-helmet-async';
import Contact from './components/contect/contect';
import React, { useState } from 'react';
import ReviewComponent from './components/repairservice/review/review';
import LoginSignup from './components/LoginSignup/LoginSignup';
import RepairServices from './components/repairservice/repair';
import Header from './components/LoginSignup/header/header';
import FotterLogin from './components/fotter/fotterlogin'; // renamed to avoid confusion

const App: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isShopkeeper, setIsShopkeeper] = useState<boolean>(false);

  return (
    <HelmetProvider>
      <Router>
        <MainApp
          userId={userId}
          username={username}
          isShopkeeper={isShopkeeper}
          handleLogin={(id, name, isShopkeeper) => {
            setUserId(id);
            setUsername(name);
            setIsShopkeeper(isShopkeeper);
          }}
        />
      </Router>
    </HelmetProvider>
  );
};

interface MainAppProps {
  userId: string | null;
  username: string | null;
  isShopkeeper: boolean;
  handleLogin: (userId: string, username: string, isShopkeeper: boolean) => void;
}

const MainApp: React.FC<MainAppProps> = ({ userId, username, isShopkeeper, handleLogin }) => {
  const location = useLocation();

  // If user is not logged in and on /reviews page, show only login/signup container
  if (location.pathname === "/reviews" && !userId) {
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
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/smartphone" element={<ProductList />} />
          <Route path="/electronics" element={<GadgetsList />} />
          <Route path="/home-appliance" element={<HomeAppliances />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/manage-products" element={<ProductManagement />} />
          <Route path="/contect" element={<Contact />} />
          <Route path="/repair-services" element={<RepairServices />} />
          <Route path="/reviews" element={
            <ReviewComponent
              productId="60f3b3b3b3b3b3b3b3b3b3b3"
              userId={userId || ""}
              username={username || ""}
              isShopkeeper={isShopkeeper}
            />
          } />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
