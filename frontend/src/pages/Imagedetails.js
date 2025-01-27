import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const ImageDetails = () => {  
  const { id } = useParams();  // Get the image ID from the URL
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const fetchImageDetails = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from localStorage
        const response = await axios.get(`${API_URL}/api/wallpaper/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = response.data.data;  // Assuming the actual data is inside the 'data' property
        setImageData(data); // Set the image data state
      } catch (error) {
        console.error("Error fetching image details:", error);
      }
    };
  
    fetchImageDetails();
  }, [id]);

  if (!imageData) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6 md:p-12 space-y-8">
      {/* Image Container */}
      <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-8">
        <img
          src={imageData.path}  // Using 'path' to display the full image
          alt={imageData.id}
          className="w-full max-w-3xl rounded-xl shadow-lg hover:scale-105 ml-52 transform transition duration-500 ease-in-out"
        />

        <div className="space-y-4 max-w-xl text-center md:text-left">
          <p className="text-lg  text-gray-600">Uploaded by <span className="font-semibold">{imageData.uploader.username}</span></p>
        </div>
      </div>

      {/* Image Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Details Card */}
        <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Details</h2>
          <ul className="space-y-3 text-lg text-gray-600">
            <li><strong>Category :</strong> {imageData.category}</li>
            <li><strong>Purity :</strong> {imageData.purity}</li>
            <li><strong>Size : </strong> {Math.round(imageData.file_size / 1024)} KiB</li> {/* Size in KiB */}
            <li><strong>Resolution :</strong> {imageData.resolution}</li>
          </ul>
        </div>

        {/* Stats Card */}
        <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Stats</h2>
          <ul className="space-y-3 text-lg text-gray-600">
            <li><strong>Views :</strong> {imageData.views}</li>
            <li><strong>Favorites:</strong> {imageData.favorites}</li>
          </ul>
        </div>

        {/* Tags Card */}
        <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {imageData.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm font-medium text-white bg-gray-800 rounded-full"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Back to Gallery Button */}
      <div className="text-center mt-12">
        <button
          onClick={() => window.history.back()}
          className="px-8 py-3 text-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-full shadow-lg transition duration-300"
        >
          Back to Gallery
        </button>
      </div>
    </div>
  );
};

export default ImageDetails;
