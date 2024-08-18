import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import MeetUs from "./components/MeetUs";
import Signup from "./components/Signup";
import ShareComp from "./components/ShareComp";
import Eachservice from "./components/Eachservice";
import Login from "./components/Login";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./components/Dashboard";
import Admindashboard from "./components/Admindashboard";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ShareComp />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:userId" element={<Eachservice />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/meet" element={<MeetUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      {/* Vehicle Rental Routes */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute type="user">
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin-dashboard/*"
        element={
          <ProtectedRoute type="admin">
            <Admindashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

const AppWrapper = () => <App />;

export default AppWrapper;
