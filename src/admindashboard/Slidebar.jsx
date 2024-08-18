// Slidebar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaCar,
  FaCalendarAlt,
  FaList,
  FaDollarSign,
  FaUsers,
  FaSignOutAlt,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import "./Slidebar.css";

const Slidebar = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const navigate = useNavigate();

  const toggleDropdown = (index) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const menuItems = [
    {
      icon: FaUser,
      label: "adminwidgets",
      link: "/admin-dashboard/adminwidgets",
    },
    {
      icon: FaCar,
      label: "Vehicle List",
      link: "/admin-dashboard/allvehicles",
    },
    {
      icon: FaPlus,
      label: "Add Vehicle",
      link: "/admin-dashboard/add-vehicle",
    },
    {
      icon: FaList,
      label: "Booking List",
      link: "/admin-dashboard/allbookings",
    },
    {
      icon: FaList,
      label: "SearchuserBookings",
      link: "/admin-dashboard/searchbookings",
    },
    {
      icon: FaDollarSign,
      label: "Payments",
      link: "/admin-dashboard/allpayments",
    },
    {
      icon: FaUsers,
      label: "Users List",
      link: "/admin-dashboard/userlists",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    navigate("/login");
  };

  return (
    <div className="slidebar-container  bg-gray-900 text-white scrollbar-hide scrollbar-custom transition-all duration-500 h-screen">
      <div className="bg-gradient-to-br from-gray-100 to-red-600 p-5 text-center mb-10">
        <h1 className="text-xl font-bold mb-2 text-black">Vehicle Rental</h1>
        <div className="flex items-center justify-center mb-4">
          <img
            src="https://onroadz.com/wp-content/uploads/2022/03/Onroadz-Car-Rental.png"
            alt="logo"
            className="rounded-full mr-3 w-16"
          />
        </div>
        <div className="flex justify-center space-x-4">
          <FaUser
            className="text-white"
            onClick={() => navigate("/admin-dashboard/myprofile")}
          />
          <FaSignOutAlt className="text-white" onClick={handleLogout} />
        </div>
      </div>
      <ul className="space-y-3 p-3">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.link}
              className="flex items-center p-2 rounded cursor-pointer hover:bg-gray-600 transition-all duration-300"
            >
              <item.icon className="mr-2" />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Slidebar;
