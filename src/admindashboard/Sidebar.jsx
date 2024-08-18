// Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } w-64 md:w-72 lg:w-80 xl:w-96 z-30`}
    >
      <nav className="mt-6">
        <ul>
          <li>
            <Link
              to="/profile"
              className="block px-4 py-2 text-gray-200 hover:bg-gray-700"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              className="block px-4 py-2 text-gray-200 hover:bg-gray-700"
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/widgets"
              className="block px-4 py-2 text-gray-200 hover:bg-gray-700"
            >
              Widgets
            </Link>
          </li>
          <li>
            <Link
              to="/payments"
              className="block px-4 py-2 text-gray-200 hover:bg-gray-700"
            >
              Payments
            </Link>
          </li>
          <li>
            <Link
              to="/bookings"
              className="block px-4 py-2 text-gray-200 hover:bg-gray-700"
            >
              Bookings
            </Link>
          </li>
          <li>
            <Link
              to="/addvehicle"
              className="block px-4 py-2 text-gray-200 hover:bg-gray-700"
            >
              Add Vehicle
            </Link>
          </li>
          {/* Add more menu items as needed */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
