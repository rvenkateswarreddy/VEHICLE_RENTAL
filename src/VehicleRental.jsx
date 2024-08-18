import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import car from "./assets/car.jpeg";

const VehicleRental = () => {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleType, setVehicleType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [availability, setAvailability] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/vehicles", {
          params: {
            type: vehicleType || undefined,
            minPrice: minPrice || undefined,
            maxPrice: maxPrice || undefined,
            availability: availability || undefined,
            search: searchQuery || undefined,
          },
        });
        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, [vehicleType, minPrice, maxPrice, availability, searchQuery]);

  const handleBookNow = (vehicleId) => {
    navigate(`/dashboard/vehicle/${vehicleId}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Search and Filter Section */}
      <div className="mt-4 flex flex-col md:flex-row justify-between items-center bg-gray-100 p-4 rounded-md">
        <input
          type="text"
          placeholder="Search by vehicle name or model"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 md:mb-0 p-2 rounded-md border border-gray-300 flex-grow mr-4"
        />
        <div className="flex space-x-4">
          <div>
            <label className="font-medium">Min Price: </label>
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="mt-1 p-2 rounded-md border border-gray-300"
            />
          </div>
          <div>
            <label className="font-medium">Max Price: </label>
            <input
              type="number"
              placeholder="Max Price(other charges exclued)"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="mt-1 p-2 rounded-md border border-gray-300"
            />
          </div>
          <div>
            <label className="font-medium">Availability: </label>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="mt-1 p-2 rounded-md border border-gray-300"
            >
              <option value="">All</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
        </div>
      </div>

      {/* Vehicle Type Filter */}
      <div className="mt-4 flex space-x-4">
        <div>
          <label className="font-medium">Vehicle Type: </label>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="mt-1 p-2 rounded-md border border-gray-300"
          >
            <option value="">All</option>
            <option value="Electric Scooter">Electric Scooter</option>
            <option value="Petrol Scooter">Petrol Scooter</option>
            <option value="Car">Car</option>
            <option value="Diesel Scooter">Diesel Scooter</option>
            <option value="Bicycle">Bicycle</option>
            <option value="Bike">Bike</option>
          </select>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle._id}
            className="border w-[520px] h-[520px] rounded-md p-4 shadow-2xl"
          >
            <img
              src={vehicle.image_url}
              alt={`${vehicle.make} ${vehicle.model}`}
              className={`w-full ${
                vehicle.type === "Bicycle" ? "h-[300px]" : "h-41"
              } object-cover rounded-md`}
            />
            <h4 className="text-xl font-bold text-gray-800 mt-4">
              {vehicle.make} {vehicle.model}{" "}
              <span className="text-gray-500">or similar</span>
            </h4>
            <p className="text-sm text-gray-500">{vehicle.type}</p>
            <div className="flex items-center mt-2">
              <span className="text-green-500 font-bold">
                {vehicle.rating}/5
              </span>
              <span className="text-gray-500 ml-2">
                ({vehicle.num_ratings} ratings)
              </span>
            </div>
            <p className="mt-2 text-gray-700">
              20 kms included | ₹{vehicle.price_per_km}/km after 20 kms
            </p>
            <p className="text-lg font-semibold text-gray-800 mt-2">
              ₹{vehicle.price_per_hour} + ₹58 (Other Charges)
            </p>
            <button
              className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
              onClick={() => handleBookNow(vehicle._id)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleRental;
