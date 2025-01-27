import React, { useState, useEffect } from 'react';
import UserProfileModal from '../components/UserProfileModal';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      console.log(response.data);
      setUser(data);
      fetchFavorites(data.id); // Assuming 'data._id' is the user's ID
    };
    

    const fetchFavorites = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/user/6795eac0936949dc2b45ca5e/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setFavorites(response.data.favorites);
    };

    fetchUser();
  }, []);


  

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login page after logout
  };

  

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-28">
      <h1 className="text-2xl text-gray-800 font-semibold mb-8 text-center">
        Welcome back, {user?.name}
      </h1>

      {user && (
        <div className="flex flex-col items-center space-y-6 mb-8">
          <div className="relative">
            <img
              src={user.profilePic}
              alt={`${user.name}'s profile`}
              className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-lg"
            />
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-gray-600 text-lg">{user.email}</p>
          </div>

          <div className="w-full space-y-4 mt-6">
            <button
              onClick={() => setShowModal(true)}
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              View Wallpapers
            </button>

            {showModal && <UserProfileModal user={user} onClose={() => setShowModal(false)} />}

            <button
              onClick={handleLogout}
              className="w-full py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProfilePage;
