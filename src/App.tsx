import './App.scss'
import { Navbar } from './components/nevbar/navbar'
import "remixicon/fonts/remixicon.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from './components/products/productlist/productlist';
import ProductDetails from './components/products/productDitails/productdetails';
import { Hero } from './components/Hero/hero';
import GadgetsList from './components/electronic/electronic';
import GadgetDetails from './components/electronic/electronicdetails/electronidetails';
import HomeAppliances from './components/homeappliance/homeappliance';
import ApplianceDetails from './components/homeappliance/homeappliance/homeappliancedetails';
import Footer from './components/fotter/fotter';
import AddProduct from './components/addproduct/AddProduct';
import ProductManagement from './components/product/ProductManagement';

function App() {
  return (
    <Router>
      <Navbar />
      <div className='App'>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="smartphone" element={<ProductList />} />
          <Route path="electronics" element={<GadgetsList />} />
          <Route path="homeappliences" element={<HomeAppliances />} />
          <Route path="/appliance/:id" element={<ApplianceDetails />} />
          <Route path="/gadget/:id" element={<GadgetDetails />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/manage-products" element={<ProductManagement />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}

export default App;
