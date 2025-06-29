import { useEffect, useState } from 'react';
import axios from 'axios';
import './SearchPage.css'

function SearchPage() {
  const [data, setData] = useState([]);
  const [typeFilter, setTypeFilter] = useState({ Issue: true, Suggestion: true });
  const [localityFilter, setLocalityFilter] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get('http://localhost:3000/info');
    setData(res.data);
  };

  const handleCheckboxChange = (id, resolved) => {
    axios.put(`http://localhost:3000/info/${id}`, { resolved: !resolved })
      .then(() => fetchData());
  };

  const filteredData = data.filter(item => {
    const typeMatch = typeFilter[item.incident_type] ?? false;
    const localityMatch = item.location.toLowerCase().includes(localityFilter.toLowerCase());
    return typeMatch && localityMatch;
  });

  return (
    <div className='bg-background text-text transition-colors duration-300 ease-in-out' style={{ padding: 20 }}>
      <h2 className='font-bold underline'>Incident Tracker</h2>

      <div style={{ marginBottom: 20 }}>
        <label>
          <input
            type="checkbox"
            checked={typeFilter.Issue}
            onChange={() =>
              setTypeFilter(prev => ({ ...prev, Issue: !prev.Issue }))
            }
          /> Issue
        </label>
        &nbsp;&nbsp;
        <label>
          <input
            type="checkbox"
            checked={typeFilter.Suggestion}
            onChange={() =>
              setTypeFilter(prev => ({ ...prev, Suggestion: !prev.Suggestion }))
            }
          /> Suggestion
        </label>
        &nbsp;&nbsp;
        <input
          placeholder="Search locality"
          value={localityFilter}
          onChange={(e) => setLocalityFilter(e.target.value)}
          className='p-4 py-1.5 border border-text'
        />
      </div>

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Type</th>
            <th>Location</th>
            <th>Caller</th>
            <th>Description</th>
            <th>Incident Time</th>
            <th>Resolved</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item._id}
            className={item.resolved ? "resolved" : ""}>
              <td>{item.date}</td>
              <td>{item.time}</td>
              <td>{item.incident_type}</td>
              <td>{item.location}</td>
              <td>{item.caller_name}</td>
              <td>{item.issue_description}</td>
              <td>{item.incident_time}</td>
              <td>
                <input
                  type="checkbox"
                  checked={item.resolved}
                  onChange={() => handleCheckboxChange(item._id, item.resolved)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SearchPage;