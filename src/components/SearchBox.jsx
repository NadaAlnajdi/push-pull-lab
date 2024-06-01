import React from "react";

export default function SearchBox({ searchQuery, handleSearch }) {
  return (
    <div className="my-3">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search books by title..."
        className="form-control"
      />
    </div>
  );
}
