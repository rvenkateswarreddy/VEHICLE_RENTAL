import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import VehicleRental from "../VehicleRental";
import VehicleDetail from "../VehicleDetail";
import VehicleDetails from "../VehicleDetails";
import Payment from "../Payment";
import PaymentSuccess from "../PaymentSuccess";
import { useNavigate } from "react-router-dom";
import MyBookings from "./MyBookings";
import Widgets from "./Widgets";
import Request from "./Request";
import NearbyVehicles from "./NearbyVehicles";
const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className="flex flex-col">
      <nav className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="text-white font-bold text-xl">
                {/* Logo */}
                <img
                  src="https://onroadz.com/wp-content/uploads/2022/03/Onroadz-Car-Rental.png"
                  alt="Logo"
                  className="h-10 w-10"
                />
              </Link>
              <div className="hidden md:block ml-10">
                <div className="flex space-x-4">
                  <Link
                    to="/dashboard/listofcars"
                    className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    List of Cars
                  </Link>
                  <Link
                    to="/dashboard/nearby"
                    className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    NearBy
                  </Link>
                  <Link
                    to="/dashboard/mybookings"
                    className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    mybookings
                  </Link>
                  <Link
                    to="/dashboard/widgets"
                    className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    widgets
                  </Link>
                  <Link
                    to="/dashboard/request"
                    className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Request Vehicles modal
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center">
              <button
                onClick={handlelogout}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      !isOpen
                        ? "M4 6h16M4 12h16m-7 6h7"
                        : "M6 18L18 6M6 6l12 12"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/dashboard/listofcars"
                className="block hover:bg-gray-700 text-white px-3 py-2 rounded-md text-base font-medium"
              >
                List of Cars
              </Link>
              <Link
                to="/dashboard/nearby"
                className="block hover:bg-gray-700 text-white px-3 py-2 rounded-md text-base font-medium"
              >
                NearBy
              </Link>
              <Link
                to="/dashboard/mybookings"
                className="block hover:bg-gray-700 text-white px-3 py-2 rounded-md text-base font-medium"
              >
                Mybookings
              </Link>
              <Link
                to="/dashboard/widgets"
                className="block hover:bg-gray-700 text-white px-3 py-2 rounded-md text-base font-medium"
              >
                widgets
              </Link>
              <Link
                to="/dashboard/request"
                className="block hover:bg-gray-700 text-white px-3 py-2 rounded-md text-base font-medium"
              >
                Request vehicle modal
              </Link>

              <button
                onClick={handlelogout}
                className="block w-full text-left bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>
      <div>
        <Routes>
          <Route index element={<Widgets />} />

          <Route path="listofcars" element={<VehicleRental />} />
          <Route path="vehicle/:vehicleId" element={<VehicleDetail />} />
          <Route path="vehicle-details" element={<VehicleDetails />} />
          <Route path="payment" element={<Payment />} />
          <Route path="paymentsuccess" element={<PaymentSuccess />} />
          <Route path="nearby" element={<NearbyVehicles />} />
          <Route path="mybookings" element={<MyBookings />} />
          <Route path="widgets" element={<Widgets />} />
          <Route path="request" element={<Request />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
