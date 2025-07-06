import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './IssueList.css';

const bengaluruWards = [
  'All',
  'Basavanagudi', 'Jayanagar', 'Malleshwaram', 'Rajajinagar', 'Shivajinagar', 'Indiranagar', 'Koramangala', 'Whitefield', 'Yelahanka', 'Hebbal', 'BTM Layout', 'Vijayanagar', 'Padmanabhanagar', 'Chickpet', 'Gandhinagar', 'Other'
];

function IssueList() {
  const [issues, setIssues] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  useEffect(() => {
    const fetchIssues = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:5000/api/issues');
        setIssues(res.data);
      } catch (err) {
        setIssues([]);
      }
      setLoading(false);
    };
    fetchIssues();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/issues/${id}/status`, { status });
      setIssues(prev => prev.map(issue => issue._id === id ? { ...issue, status: res.data.status } : issue));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const filteredIssues = filter === 'All' ? issues : issues.filter(issue => issue.area === filter);

  return (
    <div className="issuelist-container">
      <h1 className="list-heading">Reported Issues in Bengaluru</h1>
      <div className="filter-bar">
        <label>Filter by Area/Ward: </label>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          {bengaluruWards.map(ward => <option key={ward} value={ward}>{ward}</option>)}
        </select>
      </div>
      {loading ? <div>Loading...</div> : (
        <div className="issue-cards">
          {filteredIssues.length === 0 ? <div>No issues reported.</div> : filteredIssues.map(issue => (
            <div className="issue-card" key={issue._id}>
              <div className="issue-header">
                <span className="issue-area">{issue.area}</span>
                <span className={`status-badge status-${(issue.status || 'Pending').toLowerCase()}`}>{issue.status || 'Pending'}</span>
              </div>
              <h3 className="issue-title">{issue.title}</h3>
              <p className="issue-desc">{issue.description}</p>
              {issue.imageUrl && <img src={`http://localhost:5000/uploads/${issue.imageUrl}`} alt="Issue" className="issue-img" />}
              <div className="issue-meta">
                <span>By: {issue.name}</span>
                <span>Contact: {issue.contact}</span>
              </div>
              {isAdmin && (
                <div className="status-control">
                  <label>Status: </label>
                  <select value={issue.status || 'Pending'} onChange={e => handleStatusChange(issue._id, e.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="Solved">Solved</option>
                  </select>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default IssueList; 