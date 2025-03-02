import React, { useState } from "react";
import SearchInput from "../SearchInput";
import TableData from "./TableData";

function Citizendata() {
  const [citizenData, setCitizenData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (searchId) => {
    setCitizenData([]); 
    setError(""); 
    setLoading(true);
  
    try {
      const response = await fetch(
        "https://medical-website-production.up.railway.app/citizens",  
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );
  
      if (!response.ok) {
        throw new Error("Citizen not found.");
      }
  
      const result = await response.json();
      console.log("Fetched Data:", result); 

      if (!result || typeof result !== "object") {
        throw new Error("Invalid data format: expected an object");
      }

      const citizensArray = result.citizens || result; 
  
      if (!Array.isArray(citizensArray)) {
        throw new Error("Invalid data format: citizens is not an array");
      }
  
      const filteredData = citizensArray.filter(citizen => citizen.national_ID === searchId);
  
      if (filteredData.length > 0) {
        setCitizenData(filteredData); 
      } else {
        setError("No citizen found with this National ID.");
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
      <h2 className="fw-bold text-center"> Citizen Data</h2>

      <SearchInput onSearch={handleSearch} loading={loading} />

      {error && <div className="alert alert-danger">{error}</div>}

      {citizenData.length > 0 && !error && (
        <TableData data={citizenData} setData={setCitizenData} />
      )}
    </div>
  );
}

export default Citizendata;






