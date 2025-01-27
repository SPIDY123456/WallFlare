import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LatestPage from './pages/LatestPage';
import RandomPage from './pages/RandomPage';
import ProfilePage from './pages/ProfilePage';
import UploadImage from './components/UploadImage';
import LoginPage from './pages/LoginPage';
import SearchResultsPage from './pages/SearchResult';
import ImageDetails from './pages/Imagedetails';
import SearchBar from './components/SearchBar';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/"  element={<HomePage/>} />
        <Route path="/latest" element={<LatestPage/>} />
        <Route path="/random" element={<RandomPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/upload" element={<UploadImage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/search" element={<SearchResultsPage/>} />
        <Route path="/image/:id" element={<ImageDetails/>} />
      </Routes>
    </Router>
  );
};

export default App;
