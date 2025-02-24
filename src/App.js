import "./App.css";
import { Outlet, Route, Routes } from "react-router";
// import LogIn from "./components/Login/LogIn";
// import SignUp from "./components/Signup/SignUp";
import Home from "./components/Home/Home";
// import Navbar from "./components/Navbar/Navbar";
import UserProfile from "./components/UserProfile";
// import DoctorProfile from "./components/Doctor Profile/Doctorprofile";

import SideBar from "./components/Sidebar/SideBar";
import Citizendata from "./components/Citizendata/Citizendata";
import Medicaldata from "./components/Medicaldata/Medicaldata";
import CreateCitizen from "./components/Citizendata/CreateCitizen";
import CreateMedical from "./components/Medicaldata/CreateMedical";
import CreateRadiology from "./components/Radiology/CreateRadiology";
import RadiologyData from "./components/Radiology/RadiologyData";
function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<LogIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} /> */}
        <Route
          path="/"
          element={
            <>
               <Home />
            </>
          }
        />

        <Route
          path="/userprofile"
          element={
            <>
              
              <div className="row ">
                <div className="col-2 sidebar">
                  <SideBar />
                </div>
                <div className=" col-10 user-img">
                <div className="overlay"><Outlet /></div>

                   
                  
                </div>
              </div>
            </>
          }
        >
         
         <Route index element={<UserProfile />} />
          <Route path="citizendata" element={<Citizendata />} />
          <Route path="createcitizen" element={<CreateCitizen />} />
          <Route path="tableData/:searchID" element={<Citizendata />} />
          <Route path="medicaldata" element={<Medicaldata />} />
          <Route path="createmedical" element={<CreateMedical />} />
          <Route path="radiology" element={<RadiologyData/>} />
          <Route path="createradiology" element={<CreateRadiology />} />
          
          
        </Route>

        {/* <Route
          path="/doctorprofile"
          element={
            <>
              <Navbar /> <DoctorProfile />
            </>
          }
        /> */}
      </Routes>
    </div>
  );
}

export default App;
