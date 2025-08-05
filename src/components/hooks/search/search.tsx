import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./search.scss";
import ProductDetails from "../../productdetails/productdetails";

interface Product {
  _id: string;
  name: string;
  category: string;
}

const SearchBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchRef = useRef<HTMLInputElement | null>(null);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Close search input if clicked outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
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
    if (event.key === "Enter" && filteredProducts.length > 0) {
      handleProductSelect(filteredProducts[0]);
    }
  };

  const handleProductSelect = (product: Product) => {
    console.log(`${product.category} selected:`, product.name);

    setSelectedProductId(product._id);
    setIsModalOpen(true);
    setIsOpen(false);
    setSearchQuery("");
    setFilteredProducts([]);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
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
        <i
          className="ri-search-line search-icon"
          onClick={() => setIsOpen(true)}
        ></i>
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

      {/* Product Details Modal */}
      {selectedProductId && (
        <ProductDetails
          productId={selectedProductId}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default SearchBar;
