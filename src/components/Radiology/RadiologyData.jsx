import React, { useState } from "react";
import SearchInput from "../SearchInput";
import TableRadiologydata from"./TabelRadiologydata";

function RadiologyData() {
  const [radiologyData, setRadiologyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (searchId) => {
    setRadiologyData([]);
    setError("");
    setLoading(true);
  
    try {
      const response = await fetch(
        "https://medical-website-production.up.railway.app/radiology",  
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );
  
      if (!response.ok) {
        throw new Error("Radiology records not found.");
      }
  
      const result = await response.json();
      console.log("Fetched Radiology Data:", result); 
  

      if (!result || !result.data || !Array.isArray(result.data)) {
        throw new Error("Invalid data format: expected an array inside 'data'");
      }
  
      const radiologyArray = result.data; 
  
      const filteredData = radiologyArray.filter(record => record.national_ID === searchId);
  
      if (filteredData.length > 0) {
        setRadiologyData(filteredData);
      } else {
        setError("No radiology records found for this National ID.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container">
      <h2 className="fw-bold text-center">Radiology Data</h2>

      <SearchInput onSearch={handleSearch} loading={loading} />

      {error && <div className="alert alert-danger">{error}</div>}

      {radiologyData.length > 0 && !error && (
        <TableRadiologydata data={radiologyData} setData={setRadiologyData} />
      )}
    </div>
  );
}

export default RadiologyData;
