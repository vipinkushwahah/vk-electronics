import './App.scss'
import { Navbar } from './components/nevbar/navbar'
import "remixicon/fonts/remixicon.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <HelmetProvider>
    <Router>
      <Navbar />
      <div className='App'>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="smartphone" element={<ProductList />} />
          <Route path="electronics" element={<GadgetsList />} />
          <Route path="home-appliance" element={<HomeAppliances />} />
          <Route path="/product/:id" element={<ProductDetails />} /> 
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/manage-products" element={<ProductManagement />} />
          <Route path="/contect" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </Router>
    </HelmetProvider>
  )
}

export default App;
