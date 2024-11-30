import React, { useState, useEffect } from "react";
import SearchInput from "./SearchInput";
import TableData from "./TableData";

function UserProfile () {
  const [searchId, setSearchId] = useState(""); 
  const [citizenData, setCitizenData] = useState(null); 
  const [medicalData, setMedicalData] = useState([]); 

  useEffect(() => {
    if (searchId) {
   
      fetch(`http://localhost:5000/Citizen%20Data?id=${searchId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            setCitizenData(data[0]); 
          } else {
            setCitizenData(null); 
          }
        })
      fetch(`http://localhost:5000/Medical%20Data?id=${searchId}`)
        .then((res) => res.json())
        .then((data) => setMedicalData(data)) 
    }
  }, [searchId]); 

  return (
    <div>
    <SearchInput onSearch={setSearchId} />
      {citizenData && (
        <div>
        <h3 className="text-center mb-4">Citizen Data</h3>
          <TableData data={[citizenData]} />
        </div>
      )}
      {medicalData && (
        <div>
        <h3 className="text-center mb-4">medical Data</h3>
          <TableData data={medicalData} />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
