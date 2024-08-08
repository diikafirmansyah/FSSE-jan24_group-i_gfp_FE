import React, { useState } from 'react';

interface FilterProps {
    categories: string[];
    locations: string[];
    onFilterChange: (filters: { category: string; location: string }) => void;
}

const Filter: React.FC<FilterProps> = ({ categories, locations, onFilterChange }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedLocation, setSelectedLocation] = useState<string>('');

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
        onFilterChange({ category: event.target.value, location: selectedLocation });
    };

    const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLocation(event.target.value);
        onFilterChange({ category: selectedCategory, location: event.target.value });
    };

    const handleReset = () => {
        setSelectedCategory('');
        setSelectedLocation('');
        onFilterChange({ category: '', location: '' });
    };

    return (
        <div>
            <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">Select Category</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>

            <select value={selectedLocation} onChange={handleLocationChange}>
                <option value="">Select Location</option>
                {locations.map((location) => (
                    <option key={location} value={location}>
                        {location}
                    </option>
                ))}
            </select>

            <button onClick={handleReset}>Reset Filter</button>
        </div>
    );
};

export default Filter;
