// AdminDashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "./Profile";

import { FaBars } from "react-icons/fa";
import Slidebar from "../admindashboard/Slidebar";
import AddVehicleForm from "./AddVehicleForm";
import AllVehicles from "./AllVehicles";
import { Toaster } from "react-hot-toast";
import ListBookings from "./ListBookings";
import AllPayments from "./AllPayments";
import SearchBookings from "./SearchBookings";
import UsersList from "./UsersList";
import AdminWidgets from "./AdminWidgets";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className={`transition-transform ${sidebarOpen ? " md:w-64  " : "w-0"}`}
      >
        <Slidebar />
      </div>
      <div className="flex flex-col w-full">
        <div className="bg-gradient-to-br from-blue-100 to-red-600 text-white p-4 flex items-center justify-between">
          <button onClick={toggleSidebar} className="text-xl">
            <FaBars />
          </button>
          <h1 className="text-4xl text-black font-bold hover:underline uppercase pr-96">
            WELCOME AdminDashboard!
          </h1>
        </div>
        <div className="flex-grow bg-gray-100 text-black overflow-y-auto scrollbar-hide">
          <Routes>
            <Route index element={<AdminWidgets />} />
            <Route path="/adminwidgets" element={<AdminWidgets />} />
            <Route path="/add-vehicle" element={<AddVehicleForm />} />
            <Route path="/allvehicles" element={<AllVehicles />} />
            <Route path="/allbookings" element={<ListBookings />} />
            <Route path="/allpayments" element={<AllPayments />} />
            <Route path="/searchbookings" element={<SearchBookings />} />
            <Route path="/userlists" element={<UsersList />} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
