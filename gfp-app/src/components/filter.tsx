// components/Filter.tsx
import React, { useState } from 'react';

interface FilterProps {
  categories: string[];
  locations: string[];
  onFilterChange: (filters: { category: string; location: string }) => void;
}

const Filter: React.FC<FilterProps> = ({ categories, locations, onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(e.target.value);
  };

  const handleReset = () => {
    setSelectedCategory('');
    setSelectedLocation('');
    onFilterChange({ category: '', location: '' });
  };

  const applyFilters = () => {
    onFilterChange({ category: selectedCategory, location: selectedLocation });
  };

  return (
    <div>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>

      <select value={selectedLocation} onChange={handleLocationChange}>
        <option value="">Select Location</option>
        {locations.map((location) => (
          <option key={location} value={location}>{location}</option>
        ))}
      </select>

      <button onClick={applyFilters}>Apply Filters</button>
      <button onClick={handleReset}>Reset Filters</button>
    </div>
  );
};

export default Filter;
