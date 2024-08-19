import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({ handleNavLinkClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (message) => {
    handleNavLinkClick(message);
    setIsOpen(false); // Close the menu on link click
  };

  return (
    <nav className="bg-white shadow-lg py-3">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between flex-wrap">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center">
            <img
              src="https://onroadz.com/wp-content/uploads/2022/03/Onroadz-Car-Rental.png"
              alt="Logo"
              className="w-15 h-14 sm:h-14 sm:w-15"
            />
          </Link>
        </div>

        {/* Toggle Button for Mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={handleToggle}
            className="text-gray-800 hover:text-primary transition-colors duration-300"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Navigation Links Section */}
        <div
          className={`md:flex md:flex-grow items-center justify-center space-x-8 ${
            isOpen ? "block" : "hidden"
          } md:block`}
        >
          <Link
            to="/"
            className="text-lg font-bold text-gray-800 hover:text-primary transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/services"
            className="text-lg font-bold text-gray-800 hover:text-primary transition-colors duration-300"
          >
            Services
          </Link>
          <Link
            to="/about"
            className="text-lg font-bold text-gray-800 hover:text-primary transition-colors duration-300"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-lg font-bold text-gray-800 hover:text-primary transition-colors duration-300"
          >
            Contact
          </Link>
        </div>

        {/* Login Section */}
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="text-lg font-bold bg-primary px-4 py-2 rounded-full transition-colors duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-lg font-bold bg-primary px-4 py-2 rounded-full transition-colors duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
