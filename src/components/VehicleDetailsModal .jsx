import React from "react";

const VehicleDetailsModal = ({ vehicle, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Vehicle Details</h3>
        <div className="mb-4">
          <label className="block text-gray-700">Make</label>
          <p className="text-gray-900">{vehicle.make}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Model</label>
          <p className="text-gray-900">{vehicle.model}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Type</label>
          <p className="text-gray-900">{vehicle.type}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price per Hour</label>
          <p className="text-gray-900">${vehicle.price_per_hour}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price per KM</label>
          <p className="text-gray-900">${vehicle.price_per_km}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Fuel Type</label>
          <p className="text-gray-900">{vehicle.fuel_type}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Availability</label>
          <p className="text-gray-900">
            {vehicle.availability ? "Available" : "Not Available"}
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Features</label>
          <p className="text-gray-900">{vehicle.features.join(", ")}</p>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsModal;
