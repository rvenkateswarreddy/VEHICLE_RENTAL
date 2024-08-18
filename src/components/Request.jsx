import React, { useRef } from "react";
import emailjs from "emailjs-com";
import { toast, Toaster } from "react-hot-toast";

const Request = () => {
  const form = useRef();

  const sendRequest = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAIL_SERVICE_KEY,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAIL_EXTRA_KEY
      )
      .then(
        (result) => {
          console.log("SUCCESS!", result.text);
          toast.success("Request sent successfully!"); // Display success toast
        },
        (error) => {
          console.log("FAILED...", error.text);
          toast.error("Failed to send request."); // Display error toast
        }
      );
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-800 text-white min-h-screen">
      <h2 className="text-2xl mb-6">Request a Vehicle</h2>
      <div className="flex gap-9 flex-col justify-center items-center">
        <p className="text-lg mb-4">
          To request a vehicle, please fill out the form below with the details
          of your request. We will get back to you as soon as possible.
        </p>
        <form
          className="flex flex-col max-w-md w-full bg-gray-700 p-6 rounded-lg"
          ref={form}
          onSubmit={sendRequest}
        >
          <label htmlFor="name" className="text-sm mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="text-sm p-3 mb-4 border border-gray-600 rounded bg-gray-800 text-white"
          />

          <label htmlFor="email" className="text-sm mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="text-sm p-3 mb-4 border border-gray-600 rounded bg-gray-800 text-white"
          />

          <label htmlFor="phone" className="text-sm mb-2">
            Phone:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="text-sm p-3 mb-4 border border-gray-600 rounded bg-gray-800 text-white"
          />

          <label htmlFor="vehicle_type" className="text-sm mb-2">
            Vehicle Type:
          </label>
          <input
            type="text"
            id="vehicle_type"
            name="vehicle_type"
            required
            className="text-sm p-3 mb-4 border border-gray-600 rounded bg-gray-800 text-white"
          />

          <label htmlFor="request_details" className="text-sm mb-2">
            Request Details:
          </label>
          <textarea
            id="request_details"
            name="request_details"
            required
            className="text-sm p-3 mb-4 border border-gray-600 rounded bg-gray-800 text-white"
          ></textarea>

          <input
            type="submit"
            value="Submit Request"
            className="cursor-pointer bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
          />
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Request;
