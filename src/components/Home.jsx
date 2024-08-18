import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const images = [
    "https://www.hdwallpapers.in/download/white_car_in_white_background_hd_white_background-HD.jpg",
    "https://cdn.cbeditz.com/cbeditz/large/11650100829v2fubl5wgy48heoicy33efr0byogn0nqexns51txzajegjl2ow72nkicuxzstebai4ojsxoemftzucdxwhwhf9zbr9dgc7fkooym.jpg",
    "https://img.freepik.com/premium-photo/scooter-with-white-background-high-quality-ultra-hd_889056-9969.jpg",
    "https://c4.wallpaperflare.com/wallpaper/299/365/301/2015-honda-pcx150-scooter-wallpaper-preview.jpg",
    "https://www.rushlane.com/wp-content/uploads/2020/12/seat-electric-scooter-125-launch-price-4.jpg",
    "https://i.pinimg.com/736x/7e/73/24/7e732423abf22b9a42c62e7e7de794dd.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#fefefe]">
      {/* Carousel Container */}
      <div
        className="flex transition-transform duration-1000 ease-in-out w-screen h-screen"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-screen h-screen flex-shrink-0">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-[570px] object-cover" // Cover the container
            />
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 transition duration-300 ease-in-out"
      >
        &#8249;
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 transition duration-300 ease-in-out"
      >
        &#8250;
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-4 h-4 rounded-full ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-400"
            } transition duration-300 ease-in-out transform hover:scale-125`}
          ></button>
        ))}
      </div>

      {/* Book Now Button */}
      <div className="absolute inset-0 flex  items-center justify-center">
        <button
          onClick={() => navigate("/login")}
          className="px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-500 transition duration-300 ease-in-out hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Home;
