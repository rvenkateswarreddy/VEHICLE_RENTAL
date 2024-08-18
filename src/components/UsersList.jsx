import React, { useState, useEffect } from "react";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/all/users"
        );
        setUsers(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users: {error}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-[1000px] ml-9 mt-9 bg-orange-300 border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-blue-400">
          <tr>
            <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">
              Name
            </th>
            <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">
              Email
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user._id}
              className={index % 2 === 0 ? "bg-slate-200" : "bg-slate-200"}
            >
              <td className="py-3 px-6 text-sm text-gray-800">{user.name}</td>
              <td className="py-3 px-6 text-sm text-gray-800">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
