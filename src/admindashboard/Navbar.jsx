// Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="bg-gray-900 text-white flex items-center justify-between p-4 shadow-md">
      <div className="flex items-center space-x-4">
        <div className="p-4">
          <button
            className="text-gray-400 hover:text-white focus:outline-none"
            onClick={toggleSidebar}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <span className="text-lg font-semibold">Welcome to Dashboard</span>
      </div>
      <div>
        <Link to="/logout" className="text-gray-400 hover:text-white">
          Logout
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
