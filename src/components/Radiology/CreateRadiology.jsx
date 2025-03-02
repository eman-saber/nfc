import Swal from "sweetalert2";
import RadiologyForm from "./RadiologyForm";

const CreateRadiology = () => {
    const handleFormSubmit = async (formData) => {
        const formdata = new FormData();
        formdata.append("national_ID", formData.national_ID);  
        formdata.append("radiology_type", formData.radiology_type);  
        formdata.append("radiologistNotes", formData.radiologistNotes);   
        if (formData.images) {
            formdata.append("images", formData.images); 
        } else {
            Swal.fire({
                title: "⚠️ Missing Image!",
                text: "Please upload an image before submitting.",
                icon: "warning",
            });
            return;
        }
        for (let pair of formdata.entries()) {
            console.log(pair[0], pair[1]);
        }
    
        try {
            const response = await fetch("https://medical-website-production.up.railway.app/radiology/create-radiology", {
                method: "POST",
                body: formdata,
            });
    
            const result = await response.json();
            if (response.ok) {
                Swal.fire({
                    title: "✅ Success!",
                    text: "Radiology record created successfully.",
                    icon: "success",
                });
            } else {
                Swal.fire({
                    title: "❌ Failed!",
                    text: `Failed to create record: ${result.message}`,
                    icon: "error",
                });
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                title: "⚠️ Error!",
                text: "An error occurred while creating the record.",
                icon: "error",
            });
        }
    };
  return (
    <div className="container mt-5">
      <RadiologyForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default CreateRadiology;
