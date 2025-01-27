import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

const HomePage = () => {
  const [wallpapers, setWallpapers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchWallpapers = async (page) => {
    try {
      const token = localStorage.getItem("token"); 
      const response = await axios.get(
        `${API_URL}/api/wallpaper/wallpapers?page=${page}`,{ 
          headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json",
          },
        });
  
      const data = response.data;
      setWallpapers(data.data);
      setTotalPages(data.meta.last_page);
    } catch (error) {
      console.error("Error fetching wallpapers:", error);
    }
  };

  useEffect(() => {
    fetchWallpapers(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="container mx-auto px-6 md:px-12 py-6">
      {/* Wallpaper Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {wallpapers.length > 0 ? (
          wallpapers.map((wallpaper) => (
            <div
              key={wallpaper.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out"
            >
              <Link to={`/image/${wallpaper.id}`}>
                <img
                  src={wallpaper.thumbs.large}
                  alt={wallpaper.id}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
              </Link>
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  Resolution: {wallpaper.resolution}
                </h3>
                <p className="text-sm text-gray-600">Category: {wallpaper.category}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-4 text-center text-xl text-gray-500">No wallpapers found</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-10">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
        >
          Previous
        </button>
        <span className="text-lg text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
