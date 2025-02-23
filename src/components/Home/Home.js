import "./Home.css";
import homePic from "../../images/homePic.svg";
import nfcLogo from '../../images/nfcLogo.png';
import userIcone from '../../images/userIcone.png';
import { Link } from "react-router-dom";
function Home() {
  return (
    <>
  <div className="homecolor">
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
  <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
    <img src={homePic} alt="" width="300" className="" />
    <h1 className="light-gray-text">MCSEI</h1>
    <p className="light-gray-text">(Medical Card System for Emergency Information)</p>
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
  </div>
</div>
    </>
  );
}
export default Home;
