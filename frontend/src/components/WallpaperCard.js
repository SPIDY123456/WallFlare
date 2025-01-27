import React from 'react';

const WallpaperCard = ({ wallpaper, onAddToFavorites }) => {
  return (
    <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
      <img
        src={wallpaper.imageUrl}
        alt={wallpaper.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-center text-gray-800">{wallpaper.title}</h3>
      </div>
    </div>
  );
};

export default WallpaperCard;
