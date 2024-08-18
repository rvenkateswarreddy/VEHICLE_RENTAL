import React, { useState, useEffect } from "react";
import axios from "axios";
import EditVehicleModal from "./EditVehicleModal";
import VehicleDetailsModal from "./VehicleDetailsModal ";
import toast from "react-hot-toast";

const AllVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/vehicles/list/allvehicles"
      );
      setVehicles(response.data);
    } catch (error) {
      console.error("Error fetching vehicles", error);
      toast.error("Error fetching vehicles");
    }
  };

  const handleEdit = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsEditModalOpen(true);
  };

  const handleSave = (updatedVehicle) => {
    // Update the vehicles list with the updated vehicle
    setVehicles((prevVehicles) =>
      prevVehicles.map((vehicle) =>
        vehicle._id === updatedVehicle._id ? updatedVehicle : vehicle
      )
    );
    toast.success("Vehicle updated successfully");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/vehicles/${id}`);
      fetchVehicles();
      toast.success("Vehicle deleted successfully");
    } catch (error) {
      console.error("Error deleting vehicle", error);
      toast.error("Error deleting vehicle");
    }
  };

  const handleViewDetails = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Vehicle List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <div key={vehicle._id} className="p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-bold">
              {vehicle.make} {vehicle.model}
            </h3>
            <p>Type: {vehicle.type}</p>
            <p>Price per hour: ${vehicle.price_per_hour}</p>
            <p>Fuel Type: {vehicle.fuel_type}</p>
            <div className="mt-2">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
                onClick={() => handleEdit(vehicle)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded mr-2"
                onClick={() => handleDelete(vehicle._id)}
              >
                Delete
              </button>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded"
                onClick={() => handleViewDetails(vehicle)}
              >
                View Full Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {isEditModalOpen && selectedVehicle && (
        <EditVehicleModal
          vehicle={selectedVehicle}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {isDetailsModalOpen && selectedVehicle && (
        <VehicleDetailsModal
          vehicle={selectedVehicle}
          onClose={() => setIsDetailsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AllVehicles;
