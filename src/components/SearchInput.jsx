import React, { useState } from "react";
function SearchInput({ onSearch, loading }) {
  const [searchId, setSearchId] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchId.trim()) {
      onSearch(searchId);
    }
  };
  return (
    <div className="d-flex justify-content-center">
      <form className="d-flex flex-column align-items-center p-4 rounded shadow" onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          type="search"
          placeholder="Search by National ID"
          aria-label="Search"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button className="btn btn-primary mb-2" type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>

      </form>
    </div>
  );
}
export default SearchInput;




