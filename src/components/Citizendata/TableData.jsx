import React, { useState } from "react";
import Swal from "sweetalert2";

function TableData({ data, setData }) {
  const [editingCitizen, setEditingCitizen] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    _id: "",
    national_ID: "",
    full_name: "",
    address: "",
    blood_type: "",
    birth_date: "",
  });

  const columns = ["_id", "national_ID", "full_name", "address", "blood_type", "birth_date"];

  return (
    <div className="container mt-4">
      {data && data.length > 0 ? (
        <>
          <div className="row justify-content-center">
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

      {editingCitizen && (
        <div className="container mt-4">
          <h3 className="text-center">Update Citizen Data</h3>
          <form className="p-4 border rounded shadow bg-white">
            {columns.map((key) => (
              <div className="mb-3" key={key}>
                <label className="form-label">{key.replace("_", " ")}</label>
                <input
                  type={key === "birth_date" ? "date" : "text"}
                  className="form-control"
                  name={key}
                  value={updatedData[key]}
                  onChange={(e) => setUpdatedData({ ...updatedData, [key]: e.target.value })}
                  disabled={key === "national_ID" || key === "_id"} // 🔹 لا يمكن تعديلهم
                />
              </div>
            ))}

            <button type="button" className="btn btn-success me-2" onClick={handleUpdate}>
              Save Changes
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => setEditingCitizen(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );

  async function handleDelete(id) {
    if (!id) {
      Swal.fire("Error", "Cannot delete citizen because the ID is missing!", "error");
      return;
    }

    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this Citizen?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await fetch(
          `https://medical-website-production.up.railway.app/citizens/delete-citizen/${id}`,
          { method: "DELETE", headers: { "Content-Type": "application/json" } }
        );

        if (!response.ok) {
          throw new Error(`Failed to delete citizen. Response status: ${response.status}`);
        }

        setData((prevData) => prevData.filter((citizen) => citizen._id !== id));

        Swal.fire("Deleted!", "✅ Citizen deleted successfully!", "success");
      } catch (error) {
        Swal.fire("Error", "An error occurred while deleting the citizen.", "error");
      }
    }
  }

  function handleEditClick(citizen) {
    setEditingCitizen(citizen);
    setUpdatedData({
      _id: citizen._id || "",
      national_ID: citizen.national_ID || "",
      full_name: citizen.full_name || "",
      address: Array.isArray(citizen.address) ? citizen.address.join(", ") : citizen.address || "",
      blood_type: citizen.blood_type || "",
      birth_date: citizen.birth_date || "",
    });
  }

  async function handleUpdate() {
    if (!editingCitizen)
       return;
    if (updatedData.national_ID !== editingCitizen.national_ID || updatedData._id !== editingCitizen._id) {
      Swal.fire("Error", "ID and National ID cannot be changed!", "error");
      return;
    }

    const { _id, national_ID, ...updatedFields } = updatedData;

    const formattedData = {
      ...updatedFields,
      birth_date: updatedFields.birth_date
        ? new Date(updatedFields.birth_date).toISOString().split("T")[0]
        : "",
    };

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
        const response = await fetch(
          `https://medical-website-production.up.railway.app/citizens/update-citizen/${editingCitizen._id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formattedData),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to update citizen: ${errorText}`);
        }

        setData((prevData) =>
          prevData.map((citizen) =>
            citizen._id === editingCitizen._id ? { ...citizen, ...formattedData } : citizen
          )
        );
        setEditingCitizen(null);

        Swal.fire("Updated!", "✅ Citizen updated successfully!", "success");
      } catch (error) {
        Swal.fire("Error", `⚠️ An error occurred: ${error.message}`, "error");
      }
    }
  }
}

export default TableData;
