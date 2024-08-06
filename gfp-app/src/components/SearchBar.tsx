// pages/search.tsx
import { useState, FormEvent } from 'react';

type Data = {
  id: number;
  name: string;
};

export default function SearchPage() {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data: Data[] = await res.json();
    setResults(data);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 font-sans">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Search Page</h1>
      <form className="w-full max-w-md bg-white rounded-lg shadow-md p-6" onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-gray-700"
        />
        <button
          type="submit"
          className={`w-full py-3 rounded-lg text-white font-semibold ${loading ? 'bg-blue-300' : 'bg-blue-500'} hover:bg-blue-600 transition-colors`}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      <ul className="w-full max-w-md mt-8">
        {results.length > 0 ? (
          results.map(item => (
            <li key={item.id} className="p-4 border-b border-gray-300 last:border-b-0 text-gray-700">
              {item.name}
            </li>
          ))
        ) : (
          <li className="p-4 text-gray-500">No results found.</li>
        )}
      </ul>
    </div>
  );
}
