import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p>No booking details available</p>;

  const {
    vehicle_id,
    pickup_date,
    pickup_time,
    package_type,
    location,
    total_amount,
  } = state;

  const handlePayment = async () => {
    try {
      const paymentResponse = await axios.post(
        "https://vehicle-backend-okmu.onrender.com/api/payment/create",
        {
          amount: total_amount,
        }
      );
      const { id: order_id } = paymentResponse.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_SECRET_KEY, // replace with your Razorpay Key ID
        amount: total_amount * 100, // amount in paise (INR)
        currency: "INR",
        name: "OnRoad Car Rental",
        description: "Vehicle Booking Payment",
        order_id: order_id,
        handler: async (response) => {
          const paymentDetails = {
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            signature: response.razorpay_signature,
          };

          // Save booking and payment details in your backend
          await axios.post(
            "https://vehicle-backend-okmu.onrender.com/api/bookings/book",
            {
              vehicle_id,
              user_id: user?.userid,
              pickup_date,
              pickup_time,
              package_type,
              location,
              total_amount,
              payment_status: "Success",
              payment_id: paymentDetails.payment_id,
              payment_amount: total_amount,
            },
            {
              headers: {
                "y-auth-token": localStorage.getItem("userToken"),
              },
            }
          );

          // Navigate to the success page
          navigate("/dashboard/paymentsuccess", { state: { paymentDetails } });
        },
        prefill: {
          name: "rvenkateswarreddy", // replace with the actual user's name
          email: "rvenkateswarreddy12345@gmail.com", // replace with the actual user's email
          contact: "8179601369", // replace with the actual user's contact
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Payment Summary</h2>
      <p className="text-gray-700 mb-2">Vehicle ID: {vehicle_id}</p>
      <p className="text-gray-700 mb-2">Pickup Date: {pickup_date}</p>
      <p className="text-gray-700 mb-2">Pickup Time: {pickup_time}</p>
      <p className="text-gray-700 mb-2">Package: {package_type}</p>
      <p className="text-gray-700 mb-2">Location: {location}</p>
      <p className="text-gray-700 font-bold text-xl">
        Total Amount: ₹{total_amount}
      </p>

      <div className="mt-6">
        <button
          onClick={handlePayment}
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;
