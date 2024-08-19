import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";
import { toast } from "react-hot-toast";

// Register required components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);

const AdminWidgets = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(
        "https://vehicle-backend-okmu.onrender.com/api/vehicles/list/allvehicles"
      );
      setVehicles(response.data);
    } catch (error) {
      console.error("Error fetching vehicles", error);
      toast.error("Error fetching vehicles");
    }
  };

  // Count the number of vehicles by type
  const vehicleTypeCount = vehicles.reduce((acc, vehicle) => {
    const type = vehicle.type;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  // Chart data for price per hour
  const priceData = {
    labels: vehicles.map((vehicle) => vehicle.model),
    datasets: [
      {
        label: "Price Per Hour",
        data: vehicles.map((vehicle) => vehicle.price_per_hour),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart data for vehicle type distribution
  const typeData = {
    labels: Object.keys(vehicleTypeCount),
    datasets: [
      {
        label: "Number of Vehicles",
        data: Object.values(vehicleTypeCount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-8 bg-gray-800 text-white min-h-screen">
      <h2 className="text-2xl mb-6">Vehicle Data Charts</h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div>
          <h3 className="text-xl mb-4">Vehicle Type Distribution</h3>
          <Pie data={typeData} />
        </div>
        <div>
          <h3 className="text-xl mb-4">Price Per Hour</h3>
          <Bar data={priceData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default AdminWidgets;
