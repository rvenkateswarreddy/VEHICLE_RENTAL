import React, { useEffect, useState } from "react";
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
import axios from "axios";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);

const BookingChart = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userId = user?.userid;
        const response = await axios.get(
          `https://vehicle-backend-okmu.onrender.com/api/bookings/user/${userId}`
        );
        setBookings(response.data.bookings);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchBookings();
  }, [user?.userid]);

  // Aggregate bookings by vehicle type for chart data
  const vehicleTypeCount = bookings.reduce((acc, booking) => {
    const type = booking.vehicle_id.type;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const chartDataBar = {
    labels: Object.keys(vehicleTypeCount),
    datasets: [
      {
        label: "Number of Bookings",
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

  const chartDataPie = {
    labels: Object.keys(vehicleTypeCount),
    datasets: [
      {
        label: "Number of Bookings",
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

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="p-8 bg-gray-800 text-white min-h-screen">
      <h2 className="text-2xl mb-6">Bookings by Vehicle Type</h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div className="p-4 bg-gray-700 rounded-lg shadow-lg">
          <h3 className="text-xl mb-4">Bookings by Vehicle Type (Bar Chart)</h3>
          <Bar data={chartDataBar} options={chartOptions} />
        </div>
        <div className="p-4 bg-gray-700 rounded-lg shadow-lg">
          <h3 className="text-xl mb-4">Bookings by Vehicle Type (Pie Chart)</h3>
          <Pie data={chartDataPie} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default BookingChart;
