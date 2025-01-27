import React, { useState, useEffect } from 'react';
import axios from "axios";
import WallpaperCard from '../components/WallpaperCard';


const API_URL = process.env.REACT_APP_API_URL;
const LatestPage = () => {
  const [wallpapers, setWallpapers] = useState([]);

  useEffect(() => {
    const fetchLatestWallpapers = async () => {
      try {
        const token = localStorage.getItem("token"); 

        const response = await axios.get(`${API_URL}/api/wallpaper/latest`, {
          headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json",
          },
        });

        console.log("Latest Wallpapers Data:", response.data);

        // Accessing response data directly
        setWallpapers(response.data); 
      } catch (error) {
        console.error("Error fetching latest wallpapers:", error);
      }
    };

    fetchLatestWallpapers();
  }, []);


  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Latest Wallpapers</h1>
      <div className="grid grid-cols-3 gap-4">
        {wallpapers.map((wallpaper) => (
          <WallpaperCard
            key={wallpaper.title}
            wallpaper={wallpaper}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestPage;
