import LogIn from './components/LogIn';
import './App.css';
import { Outlet, Route, Routes } from 'react-router';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Navbar from './components/Navbar';
import UserProfile from './components/UserProfile';
import DoctorProfile from './components/Doctorprofile';
import TableData from './components/TableData';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LogIn />}/>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />

          <Route  path="/home" element={ <> <Navbar /> <Home /></>}/>
          <Route path="/userprofile" element={<><Navbar /><UserProfile /><Outlet /></>}>
          <Route path="tableData/:searchID" element={<TableData />} />
          </Route>

        <Route  path="/doctorprofile" element={ <><Navbar /> <DoctorProfile/> </>}/>
        
      </Routes>
    </div>
  );
}
export default App;
