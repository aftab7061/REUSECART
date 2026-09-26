
// components/SearchFilter.jsx
// Search bar + dynamic category/subcategory/price/condition filters with debug logs
import { useState, useEffect } from "react";
import { getCategories } from "../services/productService";
import "./SearchFilter.css";

const CONDITIONS = ["New", "Like New", "Good", "Fair"];

const SearchFilter = ({ filters, onChange, onReset }) => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch categories from backend on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        console.log("[SearchFilter]  Fetching categories from API...");

        const res = await getCategories();
        console.log("[SearchFilter] Raw API Response:", res);

        // Handle various response shapes safely (e.g. res.categories or direct array)
        const categoriesList =
          res?.categories || res?.data || (Array.isArray(res) ? res : []);

        console.log(
          "[SearchFilter] Parsed Categories List:",
          categoriesList,
        );
        setCategoriesData(categoriesList);
      } catch (err) {
        console.error("[SearchFilter] Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // 2. Derive subcategories whenever selected category or categoriesData changes
  const activeCategoryObj = categoriesData.find(
    (item) => item.category === filters.category,
  );

  const availableSubcategories = activeCategoryObj
    ? (activeCategoryObj.subcategories || []).filter(Boolean)
    : [];

  useEffect(() => {
    console.log(
      "[SearchFilter]  Active Category Changed:",
      filters.category || "None",
    );
    console.log(
      "[SearchFilter]  Available Subcategories:",
      availableSubcategories,
    );
  }, [filters.category, categoriesData]);

  // Handle generic input changes (search, condition, prices, subcategory)
  const handleInput = (e) => {
    const { name, value } = e.target;
    console.log(`[SearchFilter]  Field Changed -> ${name}:`, value);
    onChange({ ...filters, [name]: value });
  };

  // Handle main category selection (resets subcategory to avoid invalid state)
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    console.log(
      "[SearchFilter]  Selected Category:",
      selectedCategory || "All",
    );

    onChange({
      ...filters,
      category: selectedCategory,
      subcategory: "", // Reset subcategory when category changes
    });
  };

  // Handle reset button click
  const handleResetClick = () => {
    console.log("[SearchFilter] 🧹 Resetting filters...");
    onReset();
  };

  return (
    <div className="search-filter card">
      {/* Search Input Row */}
      <div className="search-filter-row">
        <input
          type="text"
          name="search"
          className="form-control search-input"
          placeholder="Search products by title..."
          value={filters.search || ""}
          onChange={handleInput}
        />
      </div>

      {/* Filters Row */}
      <div className="search-filter-row filters-row">
        {/* Dynamic Category Selector */}
        <select
          name="category"
          className="form-control"
          value={filters.category || ""}
          onChange={handleCategoryChange}
          disabled={loading}
        >
          <option value="">
            {loading ? "Loading categories..." : "All Categories"}
          </option>
          {categoriesData.map((item) => (
            <option key={item.category} value={item.category}>
              {item.category}
            </option>
          ))}
        </select>

        {/* Dynamic Subcategory Selector */}
        <select
          name="subcategory"
          className="form-control"
          value={filters.subcategory || ""}
          onChange={handleInput}
          disabled={!filters.category || availableSubcategories.length === 0}
        >
          <option value="">
            {!filters.category
              ? "Select Category First"
              : availableSubcategories.length === 0
                ? "No Subcategories Available"
                : "All Subcategories"}
          </option>
          {availableSubcategories.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>

        {/* Condition Selector */}
        <select
          name="condition"
          className="form-control"
          value={filters.condition || ""}
          onChange={handleInput}
        >
          <option value="">Any Condition</option>
          {CONDITIONS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Price Inputs */}
        <input
          type="number"
          name="minPrice"
          className="form-control"
          placeholder="Min ₹"
          min="0"
          value={filters.minPrice || ""}
          onChange={handleInput}
        />
        <input
          type="number"
          name="maxPrice"
          className="form-control"
          placeholder="Max ₹"
          min="0"
          value={filters.maxPrice || ""}
          onChange={handleInput}
        />

        {/* Reset Button */}
        <button
          className="btn btn-outline btn-sm reset-btn"
          onClick={handleResetClick}
          type="button"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
