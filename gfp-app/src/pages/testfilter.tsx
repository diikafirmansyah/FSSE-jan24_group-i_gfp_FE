// pages/index.tsx
import { useState } from 'react';
import Filter from '../components/filter';

interface Item {
  id: number;
  category: string;
  location: string;
  name: string;
}

const allItems: Item[] = [
  // Daftar item
  { id: 1, category: 'Electronics', location: 'New York', name: 'Laptop' },
  { id: 2, category: 'Furniture', location: 'California', name: 'Chair' },
  // Tambahkan item lainnya
];

const categories = ['Electronics', 'Furniture'];
const locations = ['New York', 'California'];

const Home = () => {
  const [filters, setFilters] = useState<{ category: string; location: string }>({
    category: '',
    location: '',
  });

  const filteredItems = allItems.filter(item => 
    (filters.category === '' || item.category === filters.category) &&
    (filters.location === '' || item.location === filters.location)
  );

  const handleFilterChange = (newFilters: { category: string; location: string }) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <Filter categories={categories} locations={locations} onFilterChange={handleFilterChange} />
      
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>{item.name} - {item.category} - {item.location}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
