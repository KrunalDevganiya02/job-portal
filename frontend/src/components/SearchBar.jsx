import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
        // Handle error, show error message to user
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/search?query=${searchQuery}`);
      setJobs(response.data);
    } catch (error) {
      console.error('Failed to fetch search results:', error);
      // Handle error, show error message to user
    }
  };

  return (
    <>
    <div style={styles.container}>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search Jobs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
          />
        <button onClick={handleSearch} style={styles.searchButton}>Search</button>
      </div>
      </div>
      <div style={styles.container}>
        
      {jobs && jobs.length > 0 ? (
        jobs.map((job) => (
          <div key={job._id} className="job-card" style={styles.card}>
            <h3>{job.title}</h3>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>Salary:</strong> ${job.salary}</p>
            <div style={styles.buttonContainer}>
              {/* Apply button */}
              <Link to={`/apply/${job._id}`} style={{ ...styles.button, backgroundColor: '#28a745' }}>
                Apply
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No jobs found</p>
      )}
    </div>
</>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    display: 'flex',
    marginBottom: '20px',
  },
  searchInput: {
    padding: '8px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '3px',
    width: '300px',
  },
  searchButton: {
    backgroundColor: '#0099ff',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    marginLeft: '10px',
    cursor: 'pointer',
    borderRadius: '3px',
  },
  card: {
    width: '20%',
    padding: '20px',
    marginBottom: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    borderRadius: '5px',
  },
  buttonContainer: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    cursor: 'pointer',
    textDecoration: 'none',
    borderRadius: '5px',
  },
};

export default SearchBar;
