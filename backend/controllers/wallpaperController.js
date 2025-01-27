const axios = require('axios');
const Wallpaper = require('../models/Wallpaper');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');


const searchWallpapers = asyncHandler(async (req, res) => {
  const { query } = req.query;
  const wallhavenApiUrl = `https://wallhaven.cc/api/v1/search?q=${query}&categories=111&purity=100&sorting=date_added&order=desc`;

  try {
    const response = await axios.get(wallhavenApiUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.WALLHAVEN_API_KEY}`
      }
    });

    const wallpapers = response.data.data.map(wallpaper => ({
      title: wallpaper.id,
      imageUrl: wallpaper.path,
      favorites:wallpaper.favorites,
      category:wallpaper.category,
      views: wallpaper.views,
      resolution: wallpaper.resolution
    }));

    res.json(wallpapers); 
  } catch (error) {
    console.error (`Error : ${error.message}`)
    res.status(500).json({ message: 'Error fetching data from Wallhaven API', error: error.message });
  }
});


const getLatestWallpapers = asyncHandler(async (req, res) => {
  const wallhavenApiUrl = `https://wallhaven.cc/api/v1/search?page=1&sort=latest&categories=100&purity=100`;

  try {
    const response = await axios.get(wallhavenApiUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.WALLHAVEN_API_KEY}`
      }
    });

    // Check if response.data.data exists and has data
    if (response.data && response.data.data) {
      const wallpapers = response.data.data.map(wallpaper => ({
        title: wallpaper.id, // Use 'id' as the filename here
        imageUrl: wallpaper.path, // URL for the wallpaper image
        favorites:wallpaper.favorites,
        category:wallpaper.category,
        views: wallpaper.views, // Number of views
        resolution: wallpaper.resolution, // Image resolution
      }));

      res.json(wallpapers); // Send the wallpapers data to the frontend
    } else {
      res.status(400).json({ message: 'No wallpapers data found' });
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Error fetching latest wallpapers from Wallhaven API', error: error.message });
  }
});



const getRandomWallpapers = asyncHandler(async (req, res) => {
  const wallhavenApiUrl = `https://wallhaven.cc/api/v1/search?page=3&sort=random&categories=100&purity=100`;

  try {
    const response = await axios.get(wallhavenApiUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.WALLHAVEN_API_KEY}`
      }
    });

    const wallpapers = response.data.data.map(wallpaper => ({
      title: wallpaper.id, // Use 'id' as the filename here
      imageUrl: wallpaper.path, // URL for the wallpaper image
      favorites:wallpaper.favorites,
      category:wallpaper.category,
      views: wallpaper.views, // Number of views
      resolution: wallpaper.resolution, // Image resolution

    }));

    res.json(wallpapers);
  } catch (error) {
    console.error (`Error : ${error.message}`)
    res.status(500).json({ message: 'Error fetching random wallpapers from Wallhaven API', error: error.message });
  }
});

const getImagesDetails = asyncHandler(async (req, res) => {
  const { id } = req.params; 
  const apiKey = process.env.WALLHAVEN_API_KEY;// Get wallpaper ID from route parameters
  const wallhavenApiUrl = `https://wallhaven.cc/api/v1/w/${id}?apikey=${apiKey}`; 

  try {
    const response = await axios.get(wallhavenApiUrl);
    
    if (response.data) {
      const wallpaper = response.data;
   
     

      res.json(wallpaper);
    } else {
      res.status(404).json({ message: 'Wallpaper details not found' });
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Error fetching wallpaper details from Wallhaven API', error: error.message });
  }
});




const getWallPapers = asyncHandler(async (req, res) => {
  const { page = 1 } = req.query; 
  const apiKey = process.env.WALLHAVEN_API_KEY; // Use your API key

  // Construct the Wallhaven API URL with the necessary parameters
  const wallhavenApiUrl = `https://wallhaven.cc/api/v1/search?apikey=${apiKey}&sorting=toplist&purity=100&page=${page}`;

  try {
    // Send a request to Wallhaven API
    const response = await axios.get(wallhavenApiUrl);

    // Send the data back to the frontend
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching wallpapers:", error);
    res.status(500).json({ message: "Failed to fetch wallpapers" });
  }
});









  
module.exports = { searchWallpapers, getLatestWallpapers, getRandomWallpapers,getImagesDetails,getWallPapers };
