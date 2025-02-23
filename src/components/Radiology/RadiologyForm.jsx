import { useState} from "react";
import Swal from "sweetalert2";

const RadiologyForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    citizenNid: "",
    radiologyType: "",
    radiologistNotes: "",
    radiologyDate: "",
    image: null,
  });

  const [previewURL, setPreviewURL] = useState(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = [ "image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        Swal.fire({
          icon: "error",
          title: "🚫 Invalid File Type",
          text: "Please upload a valid  JPG, or PNG file.",
        });
        return;
      }
      setFormData({ ...formData, image: file });
      if (file.type !== "application/dicom") {
        const imageURL = URL.createObjectURL(file);
        setPreviewURL(imageURL);
      } else {
        setPreviewURL(null); 
      }

      Swal.fire({
        icon: "success",
        title: "✅ File Selected",
        text: `You have selected: ${file.name}`,
        timer: 2000,
        showConfirmButton: false,
      });
      
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
    if (!formData.image) {
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
      citizenNid: "",
      radiologyType: "",
      radiologistNotes: "",
      radiologyDate: "",
      image: null,
    });
    setPreviewURL(null);
  };

  return (
    <>
      <h2 className="text-center fw-bold text-primary">Create Radiology Record</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Citizen NID:</label>
          <input
            type="text"
            name="citizenNid"
            className="form-control"
            value={formData.citizenNid || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Radiology Type:</label>
          <input
            type="text"
            name="radiologyType"
            className="form-control"
            value={formData.radiologyType || ""}
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
          <label className="form-label">Radiology Date:</label>
          <input
            type="date"
            name="radiologyDate"
            className="form-control"
            value={formData.radiologyDate || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Upload Image (JPG, PNG):</label>
          <input
            type="file"
            accept=".dcm, .jpg, .jpeg, .png"
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


