import React from "react";
import { Link, useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const { state } = useLocation();

  if (!state) return <p>No payment details available</p>;

  const { paymentDetails } = state;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg text-center">
      <h2 className="text-3xl font-bold text-green-600 mb-4">
        Payment Successful!
      </h2>
      <p className="text-gray-700 mb-2">
        Payment ID: {paymentDetails.payment_id}
      </p>
      <p className="text-gray-700 mb-2">Order ID: {paymentDetails.order_id}</p>
      <p className="text-gray-700 mb-2">Thank you for your payment.</p>
      <Link className="red underline" to="/dashboard">
        Go to home page
      </Link>
    </div>
  );
};

export default PaymentSuccess;
