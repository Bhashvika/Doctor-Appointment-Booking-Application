import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListDoctors from "./pages/ListDoctors";
import AddDoctors from "./pages/AddDoctors";
import AllAppointments from "./pages/AllAppointments";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/list" element={<ListDoctors />} />
          <Route path="/add" element={<AddDoctors/>} />
          <Route path="/Appointments" element={<AllAppointments/>} />
        </Routes>
      </Router>
      <ToastContainer/>
    </div>
  );
}

export default App;
