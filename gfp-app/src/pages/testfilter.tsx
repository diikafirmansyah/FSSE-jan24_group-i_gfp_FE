import { useState } from 'react';
import Filter from '../components/filter';

const categories = ['Electronics', 'Clothing', 'Books'];
const locations = ['New York', 'Los Angeles', 'Chicago'];

const Home: React.FC = () => {
    const [filters, setFilters] = useState<{ category: string; location: string }>({
        category: '',
        location: '',
    });

    const handleFilterChange = (newFilters: { category: string; location: string }) => {
        setFilters(newFilters);
    };

    return (
        <div>
            <h1>Filter Example</h1>
            <Filter
                categories={categories}
                locations={locations}
                onFilterChange={handleFilterChange}
            />

            <div>
                <h2>Applied Filters:</h2>
                <p>Category: {filters.category || 'None'}</p>
                <p>Location: {filters.location || 'None'}</p>
            </div>

            {/* You can render filtered data here based on filters */}
            <div><p>Filtered Data</p></div>
        </div>
    );
};

export default Home;
