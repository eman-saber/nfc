import './Navbar.css';
import { Link } from 'react-router-dom';
import nfcLogo from '../../images/nfcLogo.png';
// import dashboardIcon from '../../images/dashboardIcon.png';
import userIcone from '../../images/userIcone.png';
// import doctorIcon from '../../images/doctorIcon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  return (
    <>
      <nav className="navbar nav-color">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <img
                src={nfcLogo}
                alt="Logo"
                width="35"
                height="35"
                className="d-inline-block align-text-top"
              />
              <span className="ms-2 text-white">WE Care</span>
            </Link>
          </div>
          <div className="d-flex justify-content-center align-items-center">
  <ul className="navbar-nav d-flex flex-row justify-content-between gap-5">
    {/* <li className="nav-item">
      <Link 
        className="nav-link navbar-link active" 
        aria-current="page" 
        to="/"
      >
        <img
          src={dashboardIcon}
          alt="Dashboard"
          width="35"
          height="35"
          className="d-inline-block align-text-top"
        />
      </Link>
    </li> */}
    <li className="nav-item">
      <Link 
        className="nav-link navbar-link active" 
        to="/userprofile"
      >
        <img
          src={userIcone}
          alt="User Profile"
          width="35"
          height="35"
          className="d-inline-block align-text-top"
        />
      </Link>
    </li>
    {/* <li className="nav-item">
      <Link 
        className="nav-link navbar-link active"
        to="/doctorprofile"
      >
        <img
          src={doctorIcon}
          alt="Doctor Profile"
          width="35"
          height="35"
          className="d-inline-block align-text-top"
        />
      </Link>
    </li> */}
  </ul>
</div>

          <div className="dropdown">
            <button
              className="btn btn-primary text-white"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FontAwesomeIcon icon={faEllipsisV} />
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
              <li>
                <Link to={''}className="dropdown-item d-flex align-items-center gap-2">
                  <FontAwesomeIcon icon={faCog} />
                  Settings
                </Link>
              </li>
              <li>
                <Link to={''} className="dropdown-item d-flex align-items-center gap-2">
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  Log out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;