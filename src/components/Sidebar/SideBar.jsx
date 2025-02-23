import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faNotesMedical, faXRay } from "@fortawesome/free-solid-svg-icons";
import "./SideBar.css";
import userIcone from "../../images/userIcone.png";

function SideBar() {
    const location = useLocation();

    return (
        <>
            <ul className="list-unstyled">
                <li className="nav-item text-center">
                    <Link className="nav-link navbar-link active" to="/userprofile">
                        <img
                            src={userIcone}
                            alt="User Profile"
                            width="35"
                            height="35"
                            className="d-inline-block align-text-top"
                        />
                    </Link>
                </li>
                <li>
                    <Link className="side-link" to="/">
                        <FontAwesomeIcon icon={faHome} className="me-2" />
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        className={`side-link ${location.pathname === "/userprofile/citizendata" ? "active" : ""}`}
                        to="citizendata"
                    >
                        <FontAwesomeIcon icon={faUser} className="me-2" />
                        Citizen Data
                    </Link>
                </li>
                <li>
                    <Link
                        className={`side-link ${location.pathname === "/userprofile/medicaldata" ? "active" : ""}`}
                        to="medicaldata"
                    >
                        <FontAwesomeIcon icon={faNotesMedical} className="me-2" />
                        Medical Data
                    </Link>
                </li>
                <li>
                    <Link
                        className={`side-link ${location.pathname === "/userprofile/radiology" ? "active" : ""}`}
                        to="radiology"
                    >
                        <FontAwesomeIcon icon={faXRay} className="me-2" />
                        Radiology
                    </Link>
                </li>
            </ul>
        </>
    );
}

export default SideBar;

