import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const VehicleDetail = () => {
  const navigate = useNavigate();
  const { vehicleId } = useParams();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    if (vehicleId) {
      const fetchVehicleDetails = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/vehicles/${vehicleId}`
          );
          setVehicle(response.data.vehicle);
        } catch (error) {
          console.error("Error fetching vehicle details:", error);
        }
      };

      fetchVehicleDetails();
    }
  }, [vehicleId]);

  if (!vehicle) return <p>Loading...</p>;

  const handleBookNow = () => {
    navigate(`/dashboard/vehicle-details`, { state: { vehicle } });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col md:flex-row mt-14">
      <div className="md:w-1/2 p-6 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {vehicle.make} {vehicle.model}
        </h2>
        <p className="text-gray-700 mb-4">
          {vehicle.features.length > 0
            ? vehicle.features.join(", ")
            : "No features listed."}
        </p>
        <p className="text-gray-700 mb-4">
          Rating: {vehicle.rating || "Not rated"} (
          {vehicle.num_ratings || "No ratings"})
        </p>
        <p className="text-gray-700 mb-4">Fuel Type: {vehicle.fuel_type}</p>
        <p className="text-lg font-semibold text-gray-800 mb-2">
          ₹{vehicle.price_per_hour} per hour
        </p>
        <p className="text-gray-700 mb-2">₹{vehicle.price_per_km} per km</p>
        <p className="text-gray-700 mb-2">
          Extra time rate: ₹{vehicle.extra_time_rate} per hour
        </p>
        <p className="text-gray-700 mb-4">
          Cancellation Policy: {vehicle.cancellation_policy}
        </p>
        <button
          onClick={handleBookNow}
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Book Now
        </button>
      </div>
      <div className="md:w-1/2">
        <img
          src={vehicle.image_url}
          alt={`${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default VehicleDetail;
