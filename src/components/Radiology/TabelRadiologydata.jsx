import React, { useState } from "react";
import Swal from "sweetalert2";

function TableRadiologydata({ data, setData }) {
  const [editingRecord, setEditingRecord] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const columns = ["national_ID", "radiology_type", "radiologistNotes", "images"];
  
  const handleDelete = async (id) => {
    if (!id) {
      Swal.fire("Error", "Cannot delete record because the ID is missing!", "error");
      return;
    }
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this record?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await fetch(`https://medical-website-production.up.railway.app/radiology/delete-citizen/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error(`Failed to delete record. Response status: ${response.status}`);
        }

        setData((prevData) => prevData.filter((record) => record.national_ID !== id));

        Swal.fire("Deleted!", "✅ Record deleted successfully!", "success");
      } catch (error) {
        Swal.fire("Error", `An error occurred while deleting the record: ${error.message}`, "error");
      }
    }
  };
  
  const handleEditClick = (record) => {
    setEditingRecord(record);
    setUpdatedData({ ...record });
  };
  
  const handleUpdate = async () => {
    if (!editingRecord) return;
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
        const { _id, createdAt, updatedAt, __v, ...allowedData } = updatedData;

        const formData = new FormData();
        formData.append("radiology_type", allowedData.radiology_type);
        formData.append("radiologistNotes", allowedData.radiologistNotes);

        if (updatedData.images instanceof File) {
          formData.append("file", updatedData.images);
        }

        const response = await fetch(`https://medical-website-production.up.railway.app/radiology/update-citizen/${editingRecord.national_ID}`, {
          method: "PATCH",
          body: formData,
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to update record: ${errorText}`);
        }

        setData((prevData) =>
          prevData.map((record) => (record.national_ID === editingRecord.national_ID ? { ...updatedData } : record))
        );
        setEditingRecord(null);

        Swal.fire("Updated!", "✅ Record updated successfully!", "success");
      } catch (error) {
        Swal.fire("Error", `⚠️ An error occurred: ${error.message}`, "error");
      }
    }
  };

  return (
    <>
    <div className="container mt-4">
      {data && data.length > 0 ? (
        <div className="row">
          <div className="col-md-10 mx-auto">
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
                {data.map((row, index) => (
                  <tr key={index}>
                    {columns.map((key) => (
                      <td key={key}>
                        {key === "images" ? (
                          row.images && row.images.length > 0 ? (
                            <a href={row.images[0].secure_url} target="_blank" rel="noopener noreferrer">
                              View Image
                            </a>
                          ) : (
                            "No Image"
                          )
                        ) : (
                          row[key]
                        )}
                      </td>
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-center">No radiology data available</p>
      )}

      {editingRecord && (
        <div className="container mt-4">
          <h3 className="text-center">Update Radiology Data</h3>
          <form className="p-4 border rounded shadow bg-white">
            {columns.map((key) => (
              <div className="mb-3" key={key}>
                <label className="form-label">{key.replace("_", " ")}</label>
                {key === "national_ID" ? (
                  <input
                    type="text"
                    className="form-control"
                    name={key}
                    value={updatedData[key] || ""}
                    readOnly 
                  />
                ) : key === "images" ? (
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setUpdatedData({ ...updatedData, images: e.target.files[0] })}
                  />
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    name={key}
                    value={updatedData[key] || ""}
                    onChange={(e) => setUpdatedData({ ...updatedData, [key]: e.target.value })}
                  />
                )}
              </div>
            ))}
            <button type="button" className="btn btn-success me-2" onClick={handleUpdate}>
              Save Changes
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => setEditingRecord(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
    </>
  );
}

export default TableRadiologydata;
