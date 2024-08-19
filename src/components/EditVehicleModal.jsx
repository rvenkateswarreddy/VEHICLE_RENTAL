import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const EditVehicleModal = ({ vehicle, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    make: vehicle.make,
    model: vehicle.model,
    type: vehicle.type,
    price_per_hour: vehicle.price_per_hour,
    price_per_km: vehicle.price_per_km,
    fuel_type: vehicle.fuel_type,
    availability: vehicle.availability,
    features: vehicle.features.join(", "),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `https://vehicle-backend-okmu.onrender.com/api/vehicles/${vehicle._id}`,
        {
          ...formData,
          features: formData.features
            .split(",")
            .map((feature) => feature.trim()),
        }
      );
      onSave(response.data); // Pass updated data back to parent
      onClose();
    } catch (error) {
      console.error("Error updating vehicle", error);
      toast.error("Failed to update vehicle");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Edit Vehicle</h3>

        <div className="mb-4">
          <label className="block text-gray-700">Make</label>
          <input
            type="text"
            name="make"
            className="w-full border-gray-300 rounded-md"
            value={formData.make}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Model</label>
          <input
            type="text"
            name="model"
            className="w-full border-gray-300 rounded-md"
            value={formData.model}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Type</label>
          <input
            type="text"
            name="type"
            className="w-full border-gray-300 rounded-md"
            value={formData.type}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price per Hour</label>
          <input
            type="number"
            name="price_per_hour"
            className="w-full border-gray-300 rounded-md"
            value={formData.price_per_hour}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price per KM</label>
          <input
            type="number"
            name="price_per_km"
            className="w-full border-gray-300 rounded-md"
            value={formData.price_per_km}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Fuel Type</label>
          <input
            type="text"
            name="fuel_type"
            className="w-full border-gray-300 rounded-md"
            value={formData.fuel_type}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Features (comma-separated)
          </label>
          <input
            type="text"
            name="features"
            className="w-full border-gray-300 rounded-md"
            value={formData.features}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Availability</label>
          <select
            name="availability"
            className="w-full border-gray-300 rounded-md"
            value={formData.availability}
            onChange={handleChange}
          >
            <option value={true}>Available</option>
            <option value={false}>Not Available</option>
          </select>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditVehicleModal;
