const User = require('../models/User');
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Wallpaper = require('../models/Wallpaper');
const cloudinary = require('../config/cloudinary');

const generatetoken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '60d' });
}


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password,  profilePic} = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }

    const hashedPassword = await bcrypt.hash(password, 14)

    const user = await User.create({ name, email, password: hashedPassword, profilePic });

    if (user) {
        return res.status(201).json({
            id: user._id, name: user.name, email: user.email,  profilePicture: user.profilePic, token: generatetoken(user._id),
        })
    }
    else {
       return res.status(400).json({ message: "Invalid user data" })

    }

})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {

        const user = await User.findOne({ email })

        if (user && (await bcrypt.compare(password, user.password))) {
           return  res.json({
                id: user._id,
                name: user.name,
                email: user.email,
                profilePicture: user.profilePic,
                token: generatetoken(user._id),
            })
        }
        else {
            return res.status(400).json({ message: "Invalid email and passsword" })
        }
    }
    catch (error) {
        console.error("Error during login", error);
        return res.status(500).json({ message: 'Server Error' });

    }

})




const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('favorites')   
      .populate('uploads')    
      .select('-password');  

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

 
    res.json({
      id : user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      favorites: user.favorites,
      uploads: user.uploads,     
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});


const uploadImage = asyncHandler(async (req, res) => {
  const { userId } = req.params; // User ID from params
  const { imageUrl, tags } = req.body; // Get imageUrl and tags from the body

  try {
    // Validate tags and imageUrl presence
    if (!imageUrl) {
      return res.status(400).json({ message: 'Image URL is required' });
    }

    if (!tags || !Array.isArray(tags)) {
      return res.status(400).json({ message: 'Tags should be an array' });
    }

    // Check if tags start with '#' and clean them
    const cleanedTags = tags.map(tag => tag.startsWith('#') ? tag : `#${tag}`);

    // Upload the image URL to Cloudinary (using the imageUrl)
    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: 'WallHaven', // Specify the folder in Cloudinary
    });

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Save the image URL and tags to the user's uploads
    user.uploads.push({
      imageUrl: result.secure_url,  // Cloudinary image URL
      tags: cleanedTags,            // Tags
    });

    // Save the user with the new upload
    await user.save();

    // Respond with success and the uploaded data
    res.status(200).json({
      message: 'Image uploaded successfully',
      imageUrl: result.secure_url,  // Cloudinary URL
      tags: cleanedTags,
    });
  } catch (err) {
    console.error(`Error uploading image: ${err.message}`);
    res.status(500).json({ message: 'Error uploading image' });
  }
});


const getFavorites = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Assuming req.user._id contains the authenticated user's ID

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Return favorites directly from the user's document
    res.status(200).json({ favorites: user.favorites });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Error retrieving favorites' });
  }
});




const addToFavorites = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Assuming req.user._id contains the authenticated user's ID
  const { wallpaperId } = req.body; // Get wallpaperId from the request body

  try {
    const user = await User.findById(userId); // Find the user by ID
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Ensure user.favorites is an array
    if (!Array.isArray(user.favorites)) {
      user.favorites = [];
    }

    const wallpaperIdStr = wallpaperId.toString(); // Convert wallpaperId to a string (if needed)

    // Check if wallpaperId is already in favorites
    if (!user.favorites.includes(wallpaperIdStr)) {
      user.favorites.push(wallpaperIdStr); // Add wallpaperId to favorites
      await user.save(); // Save the updated user document
      res.status(201).json({ message: 'Wallpaper added to favorites' });
    } else {
      res.status(200).json({ message: 'Wallpaper already in favorites' ,Favorites: user.favorites});
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Error adding wallpaper to favorites' });
  }
});

const deleteFromFavorites = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Assuming req.user._id contains the authenticated user's ID
  const { wallpaperId } = req.body; // The specific wallpaper ID to be removed

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if the wallpaperId exists in the favorites array
    if (!user.favorites.includes(wallpaperId)) {
      return res.status(404).json({ message: 'Wallpaper ID not found in favorites' });
    }

    // Remove the specific wallpaperId from the favorites array
    user.favorites = user.favorites.filter((id) => id !== wallpaperId);
    await user.save();

    res.status(200).json({ message: 'Wallpaper removed from favorites', favorites: user.favorites });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Error removing wallpaper from favorites' });
  }
});








module.exports = { loginUser, registerUser, getUserProfile,uploadImage, addToFavorites, getFavorites,deleteFromFavorites  };
