import React, { useState } from "react";
import { Link  } from "react-router-dom";

function SearchInput({  onSearch }) {
  const [searchId, setSearchId] = useState(""); 
  const handleSearch = () => {
    if (searchId.trim()) {
      onSearch(searchId); 
    }
  };

  return (
    <div className="d-flex justify-content-center">
          <form className="d-flex flex-column align-items-center p-4 rounded shadow">
             <input
              className="form-control mb-3"
              type="search"
              placeholder="Search by ID"
              aria-label="Search by ID"
              value={searchId}
              onChange={(e) =>  setSearchId(e.target.value)}
            />
            <Link
              to={`/userprofile/tableData/${searchId}`}
              className="btn btn-primary"
              onClick={handleSearch}
            >
              Search
            </Link>
          </form>
        </div>
  );
};

export default SearchInput;