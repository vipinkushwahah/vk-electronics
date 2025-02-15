import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./search.scss";

interface Product {
  _id: string;
  name: string;
  category: string;
}

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement | null>(null); // For detecting clicks outside
  const searchContainerRef = useRef<HTMLDivElement | null>(null); // For detecting clicks outside

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Close search input if clicked outside
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
        setFilteredProducts([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://vk-electronics-backend.onrender.com/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredProducts([]);
      return;
    }

    const results = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(results);
  };

  const handleSearchKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      if (filteredProducts.length > 0) {
        handleProductSelect(filteredProducts[0]); // Select the first result if available
      }
    }
  };

  const handleProductSelect = (product: Product) => {
    // Remove the route variable as it's not needed
    if (product.category === "Smartphone") {
      // route = "/smartphone"; // This is unnecessary now
    } else if (product.category === "home-appliance") {
      // route = "/home-appliance"; // This is unnecessary now
    } else if (product.category === "Electronics") {
      // route = "/electronics"; // This is unnecessary now
    }
  
    // Navigate directly to product details
    navigate(`/product/${product._id}`);
    setIsOpen(false);
    setSearchQuery("");
    setFilteredProducts([]);
  };
  

  return (
    <div
      ref={searchContainerRef}
      className="search-container"
      onClick={(e) => e.stopPropagation()}
    >
      <div className={`search-form ${isOpen ? "open" : ""}`}>
        <input
          ref={searchRef}
          type="text"
          placeholder="Search..."
          className="search-input"
          value={searchQuery}
          onChange={handleSearchChange}
          onClick={() => setIsOpen(true)}
          onKeyPress={handleSearchKeyPress}
        />
        <i className="ri-search-line search-icon" onClick={() => setIsOpen(true)}></i>
      </div>

      {isOpen && filteredProducts.length > 0 && (
        <ul className="search-results">
          {filteredProducts.map((product) => (
            <li key={product._id} onClick={() => handleProductSelect(product)}>
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
