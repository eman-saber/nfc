import React, { useState } from "react";
import Swal from "sweetalert2";
import TableData from "../Citizendata/TableData";

function TableMedicaldata({ data, setData }) {
  const [editingMedical, setEditingMedical] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  const columns = ["citizenNid","_id", "diagnosis", "treatment","clinic_name","clinic_code"];
  

  const handleDelete = async (id) => {
    if (!id) {
      Swal.fire("Error", "Cannot delete medical record because the ID is missing!", "error");
      return;
    }
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Delete this Medical record!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await fetch(
          `https://medical-website-production.up.railway.app/medical-record/delete-medical-record/${id}`,
          { method: "DELETE", headers: { "Content-Type": "application/json" } }
        );

        if (!response.ok) {
          throw new Error(`Failed to delete medical data. Response status: ${response.status}`);
        }

        setData((prevData) => prevData.filter((medical) => medical._id !== id));

        Swal.fire("Deleted!", "✅ medical record deleted successfully!", "success");
      } catch (error) {
        Swal.fire("Error", "An error occurred while deleting the medical record.", "error");
      }
    }
  };

  const handleEditClick = (medical) => {
    setEditingMedical(medical);
    setUpdatedData({ ...medical});
  };

  const handleUpdate = async () => {
    if (!editingMedical) return;

    const confirmUpdate = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save the changes?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    });

    if (confirmUpdate.isConfirmed) {
      try {
        const { _id, record_date, citizenNid, createdAt, updatedAt, __v, ...allowedData } = updatedData;
        const cleanedData = {
          diagnosis: Array.isArray(allowedData.diagnosis) ? allowedData.diagnosis.join(", ") : allowedData.diagnosis,
          treatment: Array.isArray(allowedData.treatment) ? allowedData.treatment.join(", ") : allowedData.treatment,
        };
        const response = await fetch(
          `https://medical-website-production.up.railway.app/medical-record/update-medical-record/${editingMedical._id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cleanedData),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to update citizen: ${errorText}`);
        }

        setData((prevData) =>
          prevData.map((medical) =>
            medical._id === editingMedical._id ? { ...updatedData } : medical
          )
        );
        setEditingMedical(null);

        Swal.fire("Updated!", "✅ medical record updated successfully!", "success");
      } catch (error) {
        Swal.fire("Error", `⚠️ An error occurred: ${error.message}`, "error");
      }
    }
  };

  return (
    <><h2 className="text-primary m-3"> Medical data</h2>
    <div className="container mt-4">
      {data && data.length > 0 ? (
        <>
          <div className="row">
            <div className="col-md-8">
              <table className="table table-striped table-bordered table-hover text-center">
                <thead className="table-primary">
                  <tr>
                    {columns.map((header) => (
                      <th key={header}>{header.replace("_", " ")}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index}>
                      {columns.map((key) => (
                        <td key={key}>{row[key]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-center mt-3">
            <button className="btn btn-danger btn-lg" onClick={() => handleDelete(data[0]._id)}>
              Delete
            </button>
            <button className="btn btn-warning btn-lg ms-2" onClick={() => handleEditClick(data[0])}>
              Update
            </button>
          </div>
          
        </>
      ) : (
        <p className="text-center">No data available</p>
        
      )}
      <h2 className="text-primary m-3"> Citizen data</h2>
      <TableData data={data} setData={setData} />

      {editingMedical && (
        <div className="container mt-4">
          <h3 className="text-center">Update Medical Data</h3>
          <form className="p-4 border rounded shadow">
            {columns.map((key) => (
              <div className="mb-3" key={key}>
                <label className="form-label">{key.replace("_", " ")}</label>
                <input
                  type={key === "birth_date" ? "date" : "text"}
                  className="form-control"
                  name={key}
                  value={updatedData[key] || ""}
                  onChange={(e) => setUpdatedData({ ...updatedData, [key]: e.target.value })}
                  disabled={key === "citizenNid"}
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
    </>
  );
}
export default TableMedicaldata;