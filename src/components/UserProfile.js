import { Link } from "react-router-dom";
function UserProfile() {
    return (
      
        <div className="d-flex flex-column align-items-center mt-5 pt-3 ">
        <Link to={'createcitizen'} className="btn btn-primary mb-2 w-50">
          Create New Citizen
        </Link>
        <Link to={'createmedical'} className="btn btn-success mb-2 w-50">
          Create Medical Data
        </Link>
        <Link to={'createradiology'} className="btn btn-warning w-50">
          Create Radiology
        </Link>
      </div>
      
      
    )   
};
export default UserProfile;