import React, { useState } from "react";
import axios from "axios";
import MapPicker from "./MapPicker";

const AddVehicleForm = () => {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    type: "", // Default empty
    rating: "",
    num_ratings: "",
    price_per_hour: "",
    price_per_km: "",
    extra_time_rate: "",
    fuel_type: "",
    features: "",
    cancellation_policy: "",
    location: {
      type: "Point",
      coordinates: [0, 0], // Default coordinates
    },
    availability: false, // Default value for availability
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (name === "features") {
      setFormData({
        ...formData,
        [name]: value.split(",").map((feature) => feature.trim()), // Convert comma-separated string to array
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleLocationChange = (location) => {
    setFormData({
      ...formData,
      location: {
        type: "Point",
        coordinates: [location.lng, location.lat], // Coordinates array
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    try {
      const response = await axios.post(
        "https://vehicle-backend-okmu.onrender.com/api/vehicles",
        formData
      );
      console.log("Vehicle added:", response.data);
      alert("Vehicle added successfully");
      // Reset form data after successful submission
      setFormData({
        make: "",
        model: "",
        type: "", // Reset to empty
        rating: "",
        num_ratings: "",
        price_per_hour: "",
        price_per_km: "",
        extra_time_rate: "",
        fuel_type: "",
        features: "",
        cancellation_policy: "",
        location: {
          type: "Point",
          coordinates: [0, 0], // Default coordinates
        },
        availability: false, // Reset availability to false
      });
    } catch (error) {
      console.error("Error adding vehicle:", error);
      alert("Error adding vehicle");
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">Add Vehicle</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="make"
            placeholder="Make"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="model"
            placeholder="Model"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />
          <div className="w-full">
            <label className="block text-gray-700 mb-2" htmlFor="type">
              Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="Electric Scooter">Electric Scooter</option>
              <option value="Petrol Scooter">Petrol Scooter</option>
              <option value="Car">Car</option>
              <option value="Diesel Scooter">Diesel Scooter</option>
              <option value="Bicycle">Bicycle</option>
              <option value="Bike">Bike</option>
            </select>
          </div>
          <input
            type="text"
            name="rating"
            placeholder="Rating"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
          />
          <input
            type="text"
            name="num_ratings"
            placeholder="Number of Ratings"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
          />
          <input
            type="number"
            name="price_per_hour"
            placeholder="Price per Hour"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price_per_km"
            placeholder="Price per Km"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="extra_time_rate"
            placeholder="Extra Time Rate"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="fuel_type"
            placeholder="Fuel Type"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />
        </div>
        <textarea
          name="features"
          placeholder="Features (comma-separated)"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
        />
        <textarea
          name="cancellation_policy"
          placeholder="Cancellation Policy"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
          required
        />
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Pick Vehicle Location
          </h3>
          <MapPicker onLocationChange={handleLocationChange} />
          <div className="mt-4">
            <input
              type="text"
              name="location.coordinates[0]"
              value={formData.location.coordinates[0]}
              readOnly
              className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none"
            />
            <input
              type="text"
              name="location.coordinates[1]"
              value={formData.location.coordinates[1]}
              readOnly
              className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none mt-2"
            />
          </div>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="availability"
            checked={formData.availability}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-gray-700">Available</label>
        </div>
        <button
          type="submit"
          className="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
        >
          {loading ? "Adding..." : "Add Vehicle"}
        </button>
      </form>
    </div>
  );
};

export default AddVehicleForm;
