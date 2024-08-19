import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VehicleMap from "./VehicleMap";
const NearbyVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  console.log(vehicles);
  useEffect(() => {
    const fetchNearbyVehicles = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const maxDistance = 1000;

            try {
              const response = await axios.get(
                "https://vehicle-backend-okmu.onrender.com/api/vehicles/near/nearby",
                {
                  params: {
                    lat: latitude,
                    lng: longitude,
                    maxDistance,
                  },
                }
              );
              setVehicles(response.data);
            } catch (err) {
              setError("Error fetching nearby vehicles");
            } finally {
              setLoading(false);
            }
          },
          () => {
            setError("Geolocation not available");
            setLoading(false);
          }
        );
      } else {
        setError("Geolocation not supported");
        setLoading(false);
      }
    };

    fetchNearbyVehicles();
  }, []);
  const handleBookNow = (vehicleId) => {
    navigate(`/dashboard/vehicle/${vehicleId}`);
  };
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">
        Nearby Vehicles(100miles)
      </h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {vehicles.length > 0 ? (
        <ul>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-1 w-full gap-6">
            {vehicles.map((vehicle) => (
              <div className="flex w-full ">
                <div
                  key={vehicle._id}
                  className="border rounded-md p-4 shadow-lg w-full"
                >
                  <img
                    src={vehicle.image_url}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="w-full h-41 object-cover rounded-md"
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
                <div className="w-full">
                  <VehicleMap
                    vehicleLat={vehicle.location.coordinates[1]}
                    vehicleLng={vehicle.location.coordinates[0]}
                  />
                </div>
              </div>
            ))}
          </div>
        </ul>
      ) : (
        <p>No vehicles found nearby</p>
      )}
    </div>
  );
};

export default NearbyVehicles;
