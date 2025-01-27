import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 rounded-l-md"
        placeholder="Search for wallpapers"
      />
      <button type="submit" className="p-2 bg-white text-white rounded-lg">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
