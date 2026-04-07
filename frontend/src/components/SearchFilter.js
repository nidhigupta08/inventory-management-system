import React from "react";

function SearchFilter({ search, setSearch, filter, setFilter }) {
  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="">All Categories</option>
        <option value="Clothing">Clothing</option>
        <option value="Skincare">Skincare</option>
        <option value="Grocery">Grocery</option>
        <option value="Electronics">Electronics</option>
      </select>
    </div>
  );
}

export default SearchFilter;