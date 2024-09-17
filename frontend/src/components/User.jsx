import React, { useState, useEffect } from "react";
import axios from "axios";

const User = () => {
  const [userData, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState(null); // Store the ID of the user being updated

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (update && id) {
        // PUT request to update user data
        const response = await axios.put(
          `http://localhost:4000/api/v1/user/${id}`,
          { name: formData.name }, // Send updated name and email
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          window.alert("User updated successfully");
          setUpdate(false);
          setId(null);
          setFormData({ name: "", email: "" });
          getAllData(); // Refresh the list of users
        } else {
          window.alert("Something went wrong while updating!");
        }
      } else {
        // POST request to create a new user (if needed)
        const response = await axios.post(
          "http://localhost:4000/api/v1/register",
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          window.alert("User created successfully");
          setFormData({ name: "", email: "" });
          getAllData(); // Refresh the list of users
        } else {
          window.alert("Something went wrong while creating the user!");
        }
      }
    } catch (error) {
      window.alert("Error occurred!");
      console.log("Error:", error);
    }
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  // Fetch all user data
  const getAllData = () => {
    axios
      .get(`http://localhost:4000/api/v1/all`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data.user || []);
      })
      .catch((e) => {
        console.error("Error fetching data:", e);
      });
  };

  useEffect(() => {
    getAllData();
  }, []);

  const handleUpdate = (id, name, email) => {
    setId(id);
    setFormData({ name, email }); // Pre-fill the form with current user data
    setUpdate(true);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:4000/api/v1/user/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      getAllData();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">User List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userData.length > 0 ? (
          userData.map((user) => (
            <div
              key={user._id}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
            >
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleUpdate(user._id, user.name, user.email)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No users found</div>
        )}
      </div>
      <div>
        {update && (
          <div className="">
            <form
              action=""
              onSubmit={handleSubmit}
              className="flex items-center justify-center mt-20"
            >
              <div className="w-[400px] border-2 border-gray-600 rounded-md p-10">
                <div className="flex flex-col gap-7 py-12">
                  <input
                    type="text"
                    placeholder="Enter name"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInput}
                    className="border-2 h-[40px] border-gray-400 px-3 rounded-md"
                  />
                 
                </div>
                <button className="w-full bg-orange-400 h-[45px] rounded-md hover:bg-orange-500 text-white">
                  Update
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
