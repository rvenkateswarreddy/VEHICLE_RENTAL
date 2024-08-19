import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretkey, setSecretkey] = useState(""); // New state for secret key
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const endpoint = isAdmin
      ? "https://vehicle-backend-okmu.onrender.com/api/admin/register"
      : "https://vehicle-backend-okmu.onrender.com/api/users/register";

    try {
      await axios.post(endpoint, {
        name,
        email,
        password,
        ...(isAdmin && { secretkey }), // Include secretkey only for admin
      });
      alert(`Signup successful`);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Something went wrong");
      } else if (error.request) {
        setError("No response from server");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-gradient-to-br from-gray-100 to-blue-400 shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Create an Account
      </h2>
      <form onSubmit={handleRegister}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {isAdmin && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Secret Key
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={secretkey}
              onChange={(e) => setSecretkey(e.target.value)}
              required
            />
          </div>
        )}
        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          <label className="ml-2 block text-sm text-gray-800">
            Register as Admin
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150"
        >
          Register
        </button>
      </form>
      {error && (
        <p className="mt-4 text-center text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
};

export default Signup;
