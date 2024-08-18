import React from "react";

const services = [
  {
    name: "Luxury Cars",
    description: "Rent premium luxury cars for special occasions.",
    image:
      "https://imgd.aeplcdn.com/227x128/n/cw/ec/139619/seal-exterior-right-front-three-quarter-9.png?isig=0&q=80",
  },
  {
    name: "SUVs",
    description: "Get a spacious SUV for your family trips.",
    image:
      "https://imgd.aeplcdn.com/227x128/n/cw/ec/124839/thar-roxx-exterior-right-front-three-quarter-12.jpeg?isig=0&q=80",
  },
  {
    name: "Sports Cars",
    description: "Experience the thrill with our high-performance sports cars.",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/my22-hypersonic-1619122058.jpg?crop=0.553xw:0.369xh;0.243xw,0.417xh&resize=980:*",
  },
  {
    name: "Electric Vehicles",
    description: "Go green with our range of electric vehicles.",
    image:
      "https://ackodrive.com/_next/image/?url=https%3A%2F%2Fackodrive-assets.s3.amazonaws.com%2Fmedia%2Ftest_BA6lxwi.png&w=1920&q=75",
  },
  {
    name: "Vans",
    description: "Rent versatile vans for transport and large groups.",
    image:
      "https://imgd.aeplcdn.com/370x208/n/cw/ec/154133/maruti-suzuki-eeco-right-front-three-quarter0.jpeg?isig=0&q=80",
  },
  {
    name: "Convertibles",
    description: "Enjoy open-air driving with our stylish convertibles.",
    image:
      "https://imgd.aeplcdn.com/227x128/n/cw/ec/95475/huracan-evo-spyder-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80",
  },
];

const ServicesPage = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Our Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-gray-200 rounded-lg p-4 flex flex-col items-center justify-between"
            style={{
              boxShadow:
                "8px 8px 15px rgba(0, 0, 0, 0.1), -8px -8px 15px rgba(255, 255, 255, 0.9)",
              backgroundColor: "#e0e0e0",
              border: "1px solid #d0d0d0",
            }}
          >
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-40 object-cover rounded-t-lg mb-4"
              style={{
                borderBottom: "1px solid #d0d0d0",
              }}
            />
            <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
            <p className="text-gray-600 text-center">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
