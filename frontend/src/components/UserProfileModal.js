import React from 'react';
import { useState } from 'react';

const UserProfileModal = ({ user, onClose }) => {
  const [wallpapers, setWallpapers] = useState(user.uploads);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white p-6 rounded-lg w-3/4">
        <div className="grid grid-cols-3 gap-4">
          {wallpapers.map((wallpaper, index) => (
            <div key={index} className="border p-2">
              <img src={wallpaper.imageUrl} alt="Wallpaper" className="w-full" />
            </div>
          ))}
        </div>
        <button onClick={onClose} className="mt-4 bg-red-500 text-white p-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default UserProfileModal;
