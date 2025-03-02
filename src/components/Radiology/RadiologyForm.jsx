import { useState } from "react";
import Swal from "sweetalert2";

const RadiologyForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    national_ID: "", 
    radiology_type: "",
    radiologistNotes: "",
    images: null,
  });

  const [previewURL, setPreviewURL] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "application/dicom"];

      if (!allowedTypes.includes(file.type) && !file.name.endsWith(".dcm")) {
        Swal.fire({
          icon: "error",
          title: "🚫 Invalid File Type",
          text: "Please upload a valid JPG, PNG, or DICOM (.dcm) file.",
        });
        return;
      }

      setFormData({ ...formData, images: file });

      if (file.type === "image/jpeg" || file.type === "image/png") {
        const imageURL = URL.createObjectURL(file);
        setPreviewURL(imageURL);
      } else {
        setPreviewURL(null); 
        Swal.fire({
          icon: "info",
          title: "📄 DICOM File Selected",
          text: `You have selected a DICOM file: ${file.name}`,
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "⚠️ No File Selected",
        text: "Please select a valid file before proceeding.",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.images) {
      Swal.fire({
        icon: "error",
        title: "⚠️ Missing Image",
        text: "Please upload a valid image before submitting.",
      });
      return;
    }

    Swal.fire({
      icon: "info",
      title: "Submitting...",
      text: "Your radiology record is being submitted.",
      showConfirmButton: false,
      timer: 3000,
    });

    onSubmit(formData);

    setFormData({
      national_ID: "", 
      radiology_type: "",
      radiologistNotes: "",
      images: null,
    });
    setPreviewURL(null);
  };

  return (
    <>
      <h2 className="text-center fw-bold text-primary">Create Radiology Record</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">National ID:</label>
          <input
            type="text"
            name="national_ID"
            className="form-control"
            value={formData.national_ID || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Radiology Type:</label>
          <input
            type="text"
            name="radiology_type"
            className="form-control"
            value={formData.radiology_type || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Radiologist Notes:</label>
          <textarea
            name="radiologistNotes"
            className="form-control"
            value={formData.radiologistNotes || ""}
            onChange={handleChange} 
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Upload Image (JPG, PNG, DICOM):</label>
          <input
            type="file"
            accept=".DCM, .jpg, .jpeg, .png"
            className="form-control"
            onChange={handleFileUpload}
            required
          />
        </div>

        {previewURL && (
          <div className="text-center">
            <h5 className="text-success">Image Preview:</h5>
            <img
              src={previewURL}
              alt="Radiology Preview"
              style={{ maxWidth: "100%", height: "auto", borderRadius: "10px" }}
            />
          </div>
        )}

        <button type="submit" className="btn btn-warning w-100 mt-3">
          Submit
        </button>
      </form>
    </>
  );
};

export default RadiologyForm;
