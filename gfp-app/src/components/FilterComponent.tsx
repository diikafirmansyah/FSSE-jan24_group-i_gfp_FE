import React, { useState } from "react";

interface FilterProps {
  categories: string[];
  onFilterChange: (filters: { category: string; location: string }) => void;
}

const Filter: React.FC<FilterProps> = ({ categories, onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
    onFilterChange({
      category: event.target.value,
      location: selectedLocation,
    });
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLocation(event.target.value);
    onFilterChange({
      category: selectedCategory,
      location: event.target.value,
    });
  };

  const handleReset = () => {
    setSelectedCategory("");
    setSelectedLocation("");
    onFilterChange({ category: "", location: "" });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4">
      <select
        className="border border-gray-300 rounded px-3 py-2 w-full sm:w-auto"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <input
        className="border border-gray-300 rounded px-3 py-2 w-full sm:w-auto"
        type="text"
        value={selectedLocation}
        onChange={handleLocationChange}
        placeholder="Enter Location"
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 sm:mt-0 w-full sm:w-auto"
        onClick={handleReset}
      >
        Reset Filter
      </button>
    </div>
  );
};

export default Filter;
