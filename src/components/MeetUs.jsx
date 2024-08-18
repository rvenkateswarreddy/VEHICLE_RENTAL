import React from "react";

const teamMembers = [
  {
    name: "Venkatesh",
    role: "Co-Founder",
    image: "https://via.placeholder.com/150", // Replace with actual image URL
    bio: "Venkatesh is a visionary entrepreneur with a knack for innovation and strategic planning. He brings years of experience in technology and management to our team.",
  },
  {
    name: "Subbarayudu",
    role: "Lead Developer",
    image: "https://via.placeholder.com/150", // Replace with actual image URL
    bio: "Subbarayudu is a seasoned software engineer with a deep understanding of full-stack development. He leads our technical team with expertise and enthusiasm.",
  },
  {
    name: "Sharree Mallikarjuna",
    role: "UX/UI Designer",
    image: "https://via.placeholder.com/150", // Replace with actual image URL
    bio: "Sharree Mallikarjuna is our creative designer, crafting visually stunning and user-friendly interfaces. Her design skills ensure that our products are both beautiful and functional.",
  },
  {
    name: "Venkateswar Reddy",
    role: "Marketing Specialist",
    image: "https://via.placeholder.com/150", // Replace with actual image URL
    bio: "Venkateswar Reddy is the driving force behind our marketing efforts. With a keen understanding of market trends, he ensures our brand reaches and resonates with our target audience.",
  },
];

const MeetUs = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center"
            style={{
              boxShadow:
                "0px 4px 8px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(255, 255, 255, 0.9)",
            }}
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 object-cover rounded-full mb-4"
              style={{
                border: "4px solid #e0e0e0",
              }}
            />
            <h2 className="text-xl font-semibold mb-2">{member.name}</h2>
            <h3 className="text-lg font-medium text-gray-600 mb-4">
              {member.role}
            </h3>
            <p className="text-gray-700">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetUs;
