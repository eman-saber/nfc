import "./Home.css";
import homePic from "../../images/homePic.svg";
import Dicom from "../Dicom/dicom";

function Home() {
  return (
    <>
      <img src={homePic} alt="" width="400" className="d-block m-auto" />
      <h1 className="light-gray-text"> Approach your NFC </h1>
      <Dicom />
    </>
  );
}
export default Home;
