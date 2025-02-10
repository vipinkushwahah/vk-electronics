import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./search.scss";

const products = [
  // Smartphones
  { id: 1, name: "iQOO Z9x 5G", route: "/smartphone" },
  { id: 2, name: "iQOO Z9 Lite 5G", route: "/smartphone" },

  // Home Appliances
  { id: 3, name: "Refrigerator", route: "/homeappliances" },
  { id: 4, name: "Washing Machine", route: "/homeappliances" },
  { id: 5, name: "Microwave", route: "/homeappliances" },
  { id: 6, name: "Air Conditioner", route: "/homeappliances" },
  { id: 7, name: "Vacuum Cleaner", route: "/homeappliances" },
  { id: 8, name: "Water Purifier", route: "/homeappliances" },

  // Electronic Gadgets
  { id: 9, name: "Speakers", route: "/electronics" },
  { id: 10, name: "Chargers", route: "/electronics" },
  { id: 11, name: "Earbuds", route: "/electronics" },
  { id: 12, name: "Earphones", route: "/electronics" },
  { id: 13, name: "Screen Guard", route: "/electronics" },
];

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.pointerEvents = "none";
      const searchContainer = document.querySelector(".search-container") as HTMLElement;
      if (searchContainer) searchContainer.style.pointerEvents = "all";
    } else {
      document.body.style.pointerEvents = "all";
    }

    return () => {
      document.body.style.pointerEvents = "all";
    };
  }, [isOpen]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();

    // 🔍 Search for matching products
    const matchedProduct = products.find((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (matchedProduct) {
      navigate(matchedProduct.route);
    } else {
      alert("No matching product found!");
    }

    setIsOpen(false);
    setSearchQuery("");
  };

  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="search-container" onClick={(e) => e.stopPropagation()}>
      <form onSubmit={handleSearch} className={`search-form ${isOpen ? "open" : ""}`}>
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch(e);
          }}
        />
        <i
          className="ri-search-line search-icon"
          onClick={() => setIsOpen(true)}
        ></i>
      </form>
    </div>
  );
};

export default SearchBar;
