import React, { useState } from "react";
import SearchInput from "../SearchInput";
import TableMedicaldata from "./TabelMedicaldata";

function Medicaldata() {
  const [medicalData, setMedicalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (searchId) => {
    if (!searchId) {
      setError("Please enter a National ID.");
      return;
    }

    setMedicalData([]); 
    setError(""); 
    setLoading(true);

    try {
      const response = await fetch(
        "https://medical-website-production.up.railway.app/medical-record",  
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );

      if (!response.ok) {
        throw new Error("Medical data not found.");
      }
      const result = await response.json();
      console.log("Fetched Data:", result);
      if (!result.medicalRecords || !Array.isArray(result.medicalRecords)) {
        throw new Error("Invalid data format: medicalRecords is not an array");
      }

      const filteredData = result.medicalRecords.filter(
        (medical) => medical.national_ID === searchId
      );

      if (filteredData.length > 0) {
        setMedicalData(filteredData);
      } else {
        setError("No medical record found for this National ID.");
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
      <h2 className="fw-bold text-center"> Medical Data</h2>
      <SearchInput onSearch={handleSearch} loading={loading} />
      {error && <div className="alert alert-danger">{error}</div>}
      {medicalData.length > 0 && !error && (
        <TableMedicaldata data={medicalData} setData={setMedicalData} />
        
      )}
    </div>
  );
}

export default Medicaldata;

