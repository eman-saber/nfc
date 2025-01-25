import "./App.css";
import { Outlet, Route, Routes } from "react-router";
import LogIn from "./components/Login/LogIn";
import SignUp from "./components/Signup/SignUp";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import UserProfile from "./components/UserProfile";
import TableData from "./components/TableData";
import DoctorProfile from "./components/Doctor Profile/Doctorprofile";

import Dicom from "./components/Dicom/dicom";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dicom" element={<Dicom/>} />
        <Route
          path="/home"
          element={
            <>
              {" "}
              <Navbar /> <Home />
            </>
          }
        />
        <Route
          path="/userprofile"
          element={
            <>
              <Navbar />
              <UserProfile />
              <Outlet />
            </>
          }
        >
          <Route path="tableData/:searchID" element={<TableData />} />
        </Route>

        <Route
          path="/doctorprofile"
          element={
            <>
              <Navbar /> <DoctorProfile />{" "}
            </>
          }
        />
      </Routes>
    </div>
  );
}
export default App;
