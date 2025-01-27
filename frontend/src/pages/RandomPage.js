import React, { useState, useEffect } from 'react';
import axios from "axios";
import WallpaperCard from '../components/WallpaperCard';

const API_URL = process.env.REACT_APP_API_URL;
const RandomPage = () => {
  const [wallpapers, setWallpapers] = useState([]);

  useEffect(() => {
    const fetchRandomWallpapers = async () => {
      try {
        const token = localStorage.getItem("token"); 

        const response = await axios.get(`${API_URL}/api/wallpaper/random`, {
          headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json",
          },
        });

        console.log("Random Wallpapers Data:", response.data);
        // Accessing response data directly
        setWallpapers(response.data); 
      } catch (error) {
        console.error("Error fetching latest wallpapers:", error);
      }
    };

    fetchRandomWallpapers();
  }, []);

  const handleAddToFavorites = (wallpaperId) => {
    // Add wallpaper to favorites
    console.log('Added to favorites:', wallpaperId);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Random Wallpapers</h1>
      <div className="grid grid-cols-3 gap-4">
        {wallpapers.map((wallpaper) => (
          <WallpaperCard
            key={wallpaper.title}
            wallpaper={wallpaper}
            onAddToFavorites={handleAddToFavorites}
          />
        ))}
      </div>
    </div>
  );
};

export default RandomPage;
