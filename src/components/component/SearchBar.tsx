import { useState } from 'react';
import { devices } from '../data/deviceData';
import { useNavigate } from 'react-router-dom';
import '../styles/global.scss';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const suggestions = devices.filter(device =>
    device.model.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (model: string) => {
    navigate(`/price/${encodeURIComponent(model)}`);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Enter device name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <ul className="suggestions">
          {suggestions.map((d, i) => (
            <li key={i} onClick={() => handleSelect(d.model)}>
              {d.model}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
