import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const VehicleDetails = () => {
  const { state } = useLocation();
  const vehicle = state?.vehicle;

  if (!vehicle) return <p>No vehicle data available</p>;

  const [selectedPackage, setSelectedPackage] = useState("2 hr 20 kms");
  const [pickupDate, setPickupDate] = useState("2024-08-18");
  const [pickupTime, setPickupTime] = useState("15:00");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleBooking = () => {
    const bookingDetails = {
      vehicle_id: vehicle._id,
      pickup_date: pickupDate,
      pickup_time: pickupTime,
      package_type: selectedPackage,
      location: location,
      total_amount: calculateTotalAmount(),
    };

    if (location === "") {
      alert("Location must be entered");
      return;
    }

    // Navigate to the payment page with booking details
    navigate("/dashboard/payment", { state: bookingDetails });
  };

  const calculateTotalAmount = () => {
    const packageRate = vehicle.price_per_hour; // base rate
    const extraCharges = 58; // other charges
    return packageRate + extraCharges;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex flex-col md:flex-row">
        {/* Vehicle Details */}
        <div className="md:w-2/3 pr-0 md:pr-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {vehicle.make} {vehicle.model}
          </h2>
          <p className="text-gray-700 mb-4">Fuel Type: {vehicle.fuel_type}</p>
          <p className="text-xl font-semibold text-gray-800">
            ₹{vehicle.price_per_hour} per hour
          </p>
          <p className="text-gray-700 mt-2">₹{vehicle.price_per_km} per km</p>

          <div className="mt-6">
            <label className="block text-gray-700 font-bold mb-2">
              Select Package
            </label>
            <select
              value={selectedPackage}
              onChange={(e) => setSelectedPackage(e.target.value)}
              className="mt-1 p-2 rounded-md border border-gray-300 w-full"
            >
              {[
                "2 hr 20 kms",
                "3 hr 30 kms",
                "4 hr 40 kms",
                "5 hr 50 kms",
                "6 hr 60 kms",
                "8 hr 80 kms",
              ].map((pkg) => (
                <option key={pkg} value={pkg}>
                  {pkg}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6">
            <label className="block text-gray-700 font-bold mb-2">
              Pick-Up Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter Pickup location"
              className="mt-1 p-2 rounded-md border border-gray-300 w-full"
              required
            />
          </div>

          <div className="flex flex-col md:flex-row mt-6">
            <div className="w-full md:w-1/2 pr-0 md:pr-2 mb-4 md:mb-0">
              <label className="block text-gray-700 font-bold mb-2">
                Pick-Up Date
              </label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="mt-1 p-2 rounded-md border border-gray-300 w-full"
              />
            </div>

            <div className="w-full md:w-1/2 pl-0 md:pl-2">
              <label className="block text-gray-700 font-bold mb-2">
                Pick-Up Time
              </label>
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="mt-1 p-2 rounded-md border border-gray-300 w-full"
              />
            </div>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="md:w-1/3 mt-6 md:mt-0">
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-bold text-gray-700">Booking Summary</h3>
            <p className="mt-2 text-gray-700">Package: {selectedPackage}</p>
            <p className="mt-2 text-gray-700">
              Pick-Up: {pickupDate} at {pickupTime}
            </p>
            <p className="mt-2 text-gray-700">Location: {location}</p>
            <p className="mt-2 text-gray-700 font-bold">
              Total Amount: ₹{calculateTotalAmount()}
            </p>
            <button
              onClick={handleBooking}
              className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-4 w-full"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
