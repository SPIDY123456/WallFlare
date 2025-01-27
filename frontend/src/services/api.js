import axios from 'axios';

const API_URL= process.env.REACT_APP_API_URL;


const getAuthToken = () => {
  return localStorage.getItem('token'); 
};

export const fetchWallpapers = async (query) => {
  try {
    const token = localStorage.getItem("token"); // Get token from localStorage

    // Make the axios request with the Authorization header
    const response = await axios.get(`${API_URL}/api/wallpaper/search?query=${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,  // Include the Bearer token
        "Content-Type": "application/json",  // Specify content type
      },
    });

    // Return the data from the response
    return response.data; // Directly return data from response
  } catch (error) {
    console.error("Error fetching wallpapers:", error);
    return []; // Return an empty array in case of error
  }
};
  

  export const loginUser = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/api/user/login`, credentials);
      return response.data;  
    } catch (error) {
      throw new Error(error.response?.data?.message || 'An error occurred');
    }
  };
  
  export const logoutUser = () => {
    localStorage.removeItem('token');  
  };



export const fetchSearchResults = async (query) => {
  const token = getAuthToken();
  try {
    const response = await axios.get(`${API_URL}/search?query=${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
};
