import React from "react";
const imageurl =
  "data:image/jpeg;base64,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";
const teamMembers = [
  {
    name: "Shareef",
    role: "Co-Founder",
    image: imageurl, // Replace with actual image URL
    bio: "Shareef is a visionary entrepreneur with a knack for innovation and strategic planning. He brings years of experience in technology and management to our team.",
  },
  {
    name: "Subbarayudu",
    role: "Lead Developer",
    image: imageurl, // Replace with actual image URL
    bio: "Subbarayudu is a seasoned software engineer with a deep understanding of full-stack development. He leads our technical team with expertise and enthusiasm.",
  },
  {
    name: "Alakunta Mallikarjuna",
    role: "UX/UI Designer",
    image: imageurl, // Replace with actual image URL
    bio: "Alakunta Mallikarjuna is our creative designer, crafting visually stunning and user-friendly interfaces. Her design skills ensure that our products are both beautiful and functional.",
  },
  {
    name: "Venkateswar Reddy",
    role: "Marketing Specialist",
    image: imageurl, // Replace with actual image URL
    bio: "Venkateswar Reddy is the driving force behind our marketing efforts. With a keen understanding of market trends, he ensures our brand reaches and resonates with our target audience.",
  },
];

const About = () => {
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

export default About;
