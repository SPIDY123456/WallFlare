import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { fetchWallpapers } from "../services/api";  // Assuming this function is correct
import WallpaperCard from "../components/WallpaperCard";

const SearchResultsPage = () => {
  const [wallpapers, setWallpapers] = useState([]);
  const location = useLocation();  // Hook to access the location object
  const query = new URLSearchParams(location.search).get("query");  // Extract query param

  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        const result = await fetchWallpapers(query);  // Fetch wallpapers based on query
        if (result) {
          setWallpapers(result);  // Set the fetched wallpapers
        } else {
          setWallpapers([]);  // If no result, set empty array
        }
      }
    };

    if (query) {
      fetchData();
    }
  }, [query]);  // Re-run whenever the query changes

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Search Results</h1>
      <div className="grid grid-cols-3 gap-4">
        {Array.isArray(wallpapers) && wallpapers.length > 0 ? (
          wallpapers.map((wallpaper) => (
            <div key={wallpaper.id} className="bg-white border border-gray-200 p-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
  
                <img
                  src={wallpaper.imageUrl}
                  alt={wallpaper.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
  
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-center text-gray-800">{wallpaper.title}</h3>
              </div>
            </div>
          ))
        ) : (
          <p>No wallpapers found for "{query}"</p>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
