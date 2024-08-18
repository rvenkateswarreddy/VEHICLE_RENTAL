import React, { useState, useEffect } from "react";
import axios from "axios";

const AllPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState(null); // State for selected payment
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/payment");
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching payment details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPayment(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-5xl p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">
        Payment Details
      </h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-3 text-left">User</th>
            <th className="border p-3 text-left">Email</th>
            <th className="border p-3 text-left">Vehicle</th>
            <th className="border p-3 text-left">Pickup Date</th>
            <th className="border p-3 text-left">Total Amount</th>
            <th className="border p-3 text-left">Payment Status</th>
            <th className="border p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td className="border p-3">{payment.user_id.name}</td>
              <td className="border p-3">{payment.user_id.email}</td>
              <td className="border p-3">
                {payment.vehicle_id.make} {payment.vehicle_id.model}
              </td>
              <td className="border p-3">
                {new Date(payment.pickup_date).toLocaleDateString()}
              </td>
              <td className="border p-3">₹{payment.total_amount}</td>
              <td className="border p-3">{payment.payment_status}</td>
              <td className="border p-3">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => handleViewDetails(payment)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedPayment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg max-w-lg w-full">
            <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
            <p>
              <strong>User:</strong> {selectedPayment.user_id.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedPayment.user_id.email}
            </p>
            <p>
              <strong>Vehicle:</strong> {selectedPayment.vehicle_id.make}{" "}
              {selectedPayment.vehicle_id.model}
            </p>
            <p>
              <strong>Pickup Date:</strong>{" "}
              {new Date(selectedPayment.pickup_date).toLocaleDateString()}
            </p>
            <p>
              <strong>Pickup Time:</strong> {selectedPayment.pickup_time}
            </p>
            <p>
              <strong>Package Type:</strong> {selectedPayment.package_type}
            </p>
            <p>
              <strong>Location:</strong> {selectedPayment.location}
            </p>
            <p>
              <strong>Total Amount:</strong> ₹{selectedPayment.total_amount}
            </p>
            <p>
              <strong>Payment Status:</strong> {selectedPayment.payment_status}
            </p>
            {selectedPayment.paymentDetails ? (
              <>
                <p>
                  <strong>Razorpay ID:</strong>{" "}
                  {selectedPayment.paymentDetails.id}
                </p>
                <p>
                  <strong>Razorpay Status:</strong>{" "}
                  {selectedPayment.paymentDetails.status}
                </p>
                <p>
                  <strong>Razorpay Method:</strong>{" "}
                  {selectedPayment.paymentDetails.method}
                </p>
              </>
            ) : (
              <p>No Razorpay Payment Details</p>
            )}
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPayments;
