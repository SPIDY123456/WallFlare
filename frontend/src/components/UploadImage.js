import React, { useState } from 'react';
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !tags.trim()) {
      alert('Please provide an image and tags.');
      return;
    }

    // Upload the image to Cloudinary or a similar service
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'your_upload_preset'); // Replace with your Cloudinary preset

    try {
      // Upload image to Cloudinary and get the URL
      const uploadResponse = await axios.post('https://api.cloudinary.com/v1_1/dooslulrn/image/upload', formData);
      const imageUrl = uploadResponse.data.secure_url;

      // Prepare the tags and send to the backend
      const formattedTags = tags.split(',').map(tag => tag.trim().startsWith('#') ? tag.trim() : `#${tag.trim()}`);

      // Now send the imageUrl and tags to your API
      const userId = '6795eac0936949dc2b45ca5e';
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/api/user/${userId}/uploads`,
        { imageUrl, tags: formattedTags },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = response.data;
      if (data.success) {
        alert('Image uploaded successfully!');
      } else {
        alert('Error uploading image.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl text-black mb-4">Upload Wallpaper</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={handleImageChange}
          className="block w-full mb-4"
        />
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Enter tags (e.g., #nature, #city)"
          className="block w-full p-2 mb-4 border"
        />
        <button type="submit" className="w-full p-2  bg-blue-500 text-black">
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadImage;
