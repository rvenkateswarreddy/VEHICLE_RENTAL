import React, { useState, useEffect } from "react";
import axios from "axios";

const ListBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "https://vehicle-backend-okmu.onrender.com/api/bookings/all/bookinglist"
        );
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">Bookings</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-3 text-left">User</th>
            <th className="border p-3 text-left">Email</th>
            <th className="border p-3 text-left">Vehicle</th>
            <th className="border p-3 text-left">Pickup Date</th>
            <th className="border p-3 text-left">Pickup Time</th>
            <th className="border p-3 text-left">Total Amount</th>
            <th className="border p-3 text-left">Status</th>
            <th className="border p-3 text-left">Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td className="border p-3">{booking.user_id.name}</td>
              <td className="border p-3">{booking.user_id.email}</td>
              <td className="border p-3">
                {booking.vehicle_id.make} {booking.vehicle_id.model}
              </td>
              <td className="border p-3">
                {new Date(booking.pickup_date).toLocaleDateString()}
              </td>
              <td className="border p-3">{booking.pickup_time}</td>
              <td className="border p-3">${booking.total_amount}</td>
              <td className="border p-3">{booking.status}</td>
              <td className="border p-3">{booking.payment_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListBookings;
