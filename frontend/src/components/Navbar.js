import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Image from "../images/WF.jpeg";

const Navbar = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchText.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchText)}`);
      setSearchText(""); // Clear the input
    }
  };



  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        <div className="text-white ml-20 font-serif text-2xl">WallFlare</div>
      <img className="absolute mt-0.3 " src = {Image} alt ="WallFlare" width = "60" height="20"/>
        <form onSubmit={handleSearch} className="flex justify-center">
          <input
            type="text"
            placeholder="Search wallpapers..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="px-4 py-2 ml-56 rounded-full border-none focus:outline-none"
          />
          <button
            type="submit"
            className="bg-white text-white px-2 py-2 rounded-lg "
          >
            Search
          </button>
        </form>
        <div className="space-x-6">
          <Link to="/" className="text-white">Home</Link>
          <Link to="/latest" className="text-white">Latest</Link>
          <Link to="/random" className="text-white">Random</Link>
          <Link to="/login" className="text-white">Login</Link>
          <Link to="/profile" className="text-white">Profile</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
