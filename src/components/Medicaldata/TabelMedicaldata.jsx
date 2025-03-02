import React, { useState } from "react";
import Swal from "sweetalert2";

function TableMedicaldata({ data, setData, citizenData }) {
  const [editingMedical, setEditingMedical] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  const columns = [
    "national_ID",
    "diagnosis",
    "treatment",
    "clinic_name",
    "clinic_code",
  ];

  const handleDelete = async (national_ID) => {
    if (!national_ID) {
      Swal.fire("Error", "Cannot delete medical record because the ID is missing!", "error");
      return;
    }
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this medical record?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await fetch(
          `https://medical-website-production.up.railway.app/medical-record/delete-medical-record/${national_ID}`,
          { method: "DELETE", headers: { "Content-Type": "application/json" } }
        );

        if (!response.ok) {
          throw new Error(`Failed to delete medical data. Response status: ${response.status}`);
        }

        setData((prevData) => prevData.filter((medical) => medical.national_ID !== national_ID));

        Swal.fire("Deleted!", "✅ Medical record deleted successfully!", "success");
      } catch (error) {
        Swal.fire("Error", "An error occurred while deleting the medical record.", "error");
      }
    }
  };

  const handleEditClick = (medical) => {
    setEditingMedical(medical);
    setUpdatedData({ ...medical });
  };

  const handleUpdate = async () => {
    if (!editingMedical) return;

    try {
      console.log("Updating medical record with ID:", editingMedical.national_ID);

      let filteredData = { ...updatedData };

      if (Array.isArray(filteredData.treatment)) {
        filteredData.treatment = filteredData.treatment.join(", ");
      }
      if (Array.isArray(filteredData.diagnosis)) {
        filteredData.diagnosis = filteredData.diagnosis.join(", ");
      }

      delete filteredData._id;
      delete filteredData.recode_date;
      delete filteredData.modified_on;
      delete filteredData.__v;

      console.log("Final Data to Send:", JSON.stringify(filteredData, null, 2));

      const response = await fetch(
        `https://medical-website-production.up.railway.app/medical-record/update-medical-record/${editingMedical.national_ID}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(filteredData),
        }
      );

      const responseText = await response.text();
      console.log("Server Response:", responseText);

      if (!response.ok) {
        throw new Error(`Failed to update medical record. Server Message: ${responseText}`);
      }

      setData((prevData) =>
        prevData.map((medical) => (medical.national_ID === editingMedical.national_ID ? filteredData : medical))
      );

      setEditingMedical(null);
      Swal.fire("Updated!", "✅ Medical record updated successfully!", "success");
    } catch (error) {
      console.error("Update Error:", error);
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-primary">Medical Data</h2>

      <table className="table table-striped table-bordered table-hover text-center">
        <thead className="table-primary">
          <tr>
            {columns.map((header) => (
              <th key={header}>{header.replace("_", " ")}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((row) => (
              <tr key={row.national_ID || row._id || Math.random()}>
                {columns.map((key, index) => (
                  <td key={`${row.national_ID || row._id}-${index}`}>{row[key] || "N/A"}</td>
                ))}
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditClick(row)}>
                    Update
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(row.national_ID)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="text-center">
                No medical records found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {editingMedical && (
        <div className="container mt-4">
          <h3 className="text-center">Update Medical Record</h3>
          <form className="p-4 border rounded shadow bg-white">
            {columns.map((key) => (
              <div className="mb-3" key={key}>
                <label className="form-label">{key.replace("_", " ")}</label>
                <input
                  type="text"
                  className="form-control"
                  name={key}
                  value={updatedData[key] || ""}
                  onChange={(e) => setUpdatedData({ ...updatedData, [key]: e.target.value })}
                  disabled={key === "national_ID"} 
                />
              </div>
            ))}

            <button type="button" className="btn btn-success me-2" onClick={handleUpdate}>
              Save Changes
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => setEditingMedical(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default TableMedicaldata;
