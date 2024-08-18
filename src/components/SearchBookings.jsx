import React, { useState, useEffect } from "react";
import axios from "axios";
import car from "../assets/car.jpeg"; // Placeholder image

const SearchBookings = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [vehicleType, setVehicleType] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [rentalDuration, setRentalDuration] = useState("");
  const [location, setLocation] = useState("");

  // Combined fetching logic
  useEffect(() => {
    const fetchUsersAndBookings = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch users
        const usersResponse = await axios.get(
          "http://localhost:5000/api/users/all/users"
        );
        setUsers(usersResponse.data);

        // Fetch bookings if a user is selected
        if (selectedUser) {
          const bookingsResponse = await axios.get(
            `http://localhost:5000/api/bookings/user/${selectedUser}`
          );
          setBookings(bookingsResponse.data.bookings);
          setFilteredBookings(bookingsResponse.data.bookings); // Set initial filtered bookings
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersAndBookings();
  }, [selectedUser]); // Re-fetch bookings when selectedUser changes

  // Apply filters to bookings
  useEffect(() => {
    let filtered = bookings;

    if (vehicleType) {
      filtered = filtered.filter(
        (booking) =>
          booking.vehicle_id.type.toLowerCase() === vehicleType.toLowerCase()
      );
    }

    if (priceRange.length === 2) {
      filtered = filtered.filter(
        (booking) =>
          booking.total_amount >= priceRange[0] &&
          booking.total_amount <= priceRange[1]
      );
    }

    if (rentalDuration) {
      filtered = filtered.filter(
        (booking) => booking.package_type === rentalDuration
      );
    }

    if (location) {
      filtered = filtered.filter((booking) =>
        booking.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    setFilteredBookings(filtered);
  }, [vehicleType, priceRange, rentalDuration, location, bookings]);

  return (
    <div className="max-w-5xl p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Bookings</h2>

      {/* User Selection */}
      <div className="mb-6">
        <select
          className="border p-2 rounded-lg"
          value={selectedUser}
          onChange={(e) => {
            setSelectedUser(e.target.value);
            // Trigger bookings fetch when a user is selected
            if (e.target.value) {
              setLoading(true); // Set loading to true while fetching new data
            }
          }}
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {/* Filter UI */}
      <div className="mb-6">
        <div className="flex space-x-4 mb-4">
          <select
            className="border p-2 rounded-lg"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
          >
            <option value="">All Vehicle Types</option>
            <option value="Electric Scooter">Electric Scooter</option>
            <option value="Petrol Scooter">Petrol Scooter</option>
            <option value="Car">Car</option>
            <option value="Diesel Scooter">Diesel Scooter</option>
            <option value="Bicycle">Bicycle</option>
            <option value="Bike">Bike</option>
          </select>

          <input
            type="text"
            placeholder="Location"
            className="border p-2 rounded-lg"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            type="number"
            placeholder="Min Price"
            className="border p-2 rounded-lg"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([parseInt(e.target.value), priceRange[1]])
            }
          />
          <input
            type="number"
            placeholder="Max Price"
            className="border p-2 rounded-lg"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], parseInt(e.target.value)])
            }
          />

          <select
            className="border p-2 rounded-lg"
            value={rentalDuration}
            onChange={(e) => setRentalDuration(e.target.value)}
          >
            <option value="">Any Duration</option>
            <option value="2 hr 20 kms">2 hr 20 kms</option>
            <option value="3 hr 20 kms">3 hr 20 kms</option>
            <option value="4 hr 20 kms">4 hr 20 kms</option>
            <option value="5 Month">5 Month</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-600 mb-6">{error}</p>}

      {/* Loading State */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* No bookings message */}
          {filteredBookings?.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            /* Bookings List */
            filteredBookings?.map((booking) => (
              <div
                key={booking._id}
                className="border border-gray-200 rounded-lg overflow-hidden mb-6 flex"
              >
                <div className="w-full p-6">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    {booking.vehicle_id.make} {booking.vehicle_id.model}
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Pick-Up Date:{" "}
                    {new Date(booking.pickup_date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 mb-2">
                    Pick-Up Time: {booking.pickup_time}
                  </p>
                  <p className="text-gray-700 mb-2">
                    Package type:
                    {booking.package_type}
                  </p>

                  <p className="text-gray-700 mb-2">
                    Location: {booking.location}
                  </p>
                  <p className="text-gray-700 mb-2">
                    Price: ₹{booking.total_amount}
                  </p>
                </div>
                <img
                  src={booking.vehicle_id.image_url}
                  alt="Car"
                  className="w-1/3 object-cover"
                />
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default SearchBookings;
