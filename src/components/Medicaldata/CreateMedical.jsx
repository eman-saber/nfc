import { useState } from "react";
import Swal from "sweetalert2";

function CreateMedical() {
  const [nationalId, setNationalId] = useState(""); 
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [clinicCode, setClinicCode] = useState("");

  const formSubmit = (e) => {
    e.preventDefault();

    fetch("https://medical-website-production.up.railway.app/medical-record/create-medical-record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        national_ID: nationalId, 
        diagnosis: diagnosis.split(","),
        treatment: treatment.split(","),
        clinic_name: clinicName,
        clinic_code: clinicCode,
      })
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Response after creation:", result);
        Swal.fire({
          title: "Success!",
          text: "✅ Medical data created successfully!",
          icon: "success",
          confirmButtonColor: "#28a745",
        });

        setNationalId(""); 
        setDiagnosis("");
        setTreatment("");
        setClinicName("");
        setClinicCode("");

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
      <h2 className="text-center fw-bold text-primary">Create Medical Data</h2>
      <form className="m-3" onSubmit={formSubmit}>
        <div className="mb-3">
          <label htmlFor="nationalID" className="form-label fw-bold">National ID:</label>
          <input 
            type="text" 
            className="form-control" 
            id="nationalID" 
            placeholder="Enter national ID" 
            required 
            value={nationalId} 
            onChange={(e) => setNationalId(e.target.value)} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="diagnosis" className="form-label fw-bold">Diagnosis:</label>
          <input 
            type="text" 
            className="form-control" 
            id="diagnosis" 
            placeholder="Enter the diagnosis" 
            required 
            value={diagnosis} 
            onChange={(e) => setDiagnosis(e.target.value)} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="treatment" className="form-label fw-bold">Treatment:</label>
          <input 
            type="text" 
            className="form-control" 
            id="treatment" 
            placeholder="Enter the treatment" 
            required 
            value={treatment} 
            onChange={(e) => setTreatment(e.target.value)} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="clinicName" className="form-label fw-bold">Clinic Name:</label>
          <input 
            type="text" 
            className="form-control" 
            id="clinicName" 
            placeholder="Enter clinic name" 
            required 
            value={clinicName} 
            onChange={(e) => setClinicName(e.target.value)} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="clinicCode" className="form-label fw-bold">Clinic Code:</label>
          <input 
            type="text" 
            className="form-control" 
            id="clinicCode" 
            placeholder="Enter clinic code" 
            required 
            value={clinicCode} 
            onChange={(e) => setClinicCode(e.target.value)} 
          />
        </div>
        <button type="submit" className="btn btn-success">Create Medical Data</button>
      </form>
    </>
  );
}

export default CreateMedical;
