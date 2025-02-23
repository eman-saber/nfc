import { useState } from "react";
import Swal from "sweetalert2";
function CreateCitizen() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [blood, setBlood] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const formSubmit = (e) => {
    e.preventDefault();
    fetch("https://medical-website-production.up.railway.app/citizens/create-citizen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        national_ID: id,
        full_name: name,
        address: address,
        blood_type: blood,
        birth_date: new Date(birthdate).toISOString().split("T")[0],
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Response after creation:", result);
        Swal.fire({
          title: "Success!",
          text: "✅ Citizen created successfully!",
          icon: "success",
          confirmButtonColor: "#28a745",
        });
        setId("");
        setName("");
        setAddress("");
        setBlood("");
        setBirthdate("");
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          title: "Error!",
          text: `⚠️ An error occurred: ${error.message}`,
          icon: "error",
          confirmButtonColor: "#d33",
        });
      });
  };
  return (
    <>
      <h2 className="text-center fw-bold text-primary">Create New Citizen</h2>
      <form onSubmit={formSubmit}>
        <div className="mb-3">
          <label htmlFor="nationalID" className="form-label">National ID:</label>
          <input 
            type="text" 
            className="form-control" 
            id="nationalID" 
            placeholder="Enter national ID" 
            required 
            value={id} 
            onChange={(e) => setId(e.target.value)} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Name:</label>
          <input 
            type="text" 
            className="form-control" 
            id="fullName" 
            placeholder="Enter full name" 
            required 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address:</label>
          <input 
            type="text" 
            className="form-control" 
            id="address" 
            placeholder="Enter address" 
            required 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bloodType" className="form-label">Blood Type:</label>
          <input 
            type="text" 
            className="form-control" 
            id="bloodType" 
            placeholder="Enter blood type" 
            required 
            value={blood} 
            onChange={(e) => setBlood(e.target.value)} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dateOfBirth" className="form-label">Birth Date:</label>
          <input 
            type="date" 
            className="form-control" 
            id="dateOfBirth" 
            required 
            value={birthdate} 
            onChange={(e) => setBirthdate(e.target.value)} 
          />
        </div>
        <button type="submit" className="btn btn-primary">Create New Citizen</button>
      </form>
    </>
  );
}
export default CreateCitizen;
