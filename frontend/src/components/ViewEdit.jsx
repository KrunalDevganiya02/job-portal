import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewEdit = () => {
  const [jobs, setJobs] = useState([]);

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

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/jobs/${id}`);
      console.log('Job deleted:', response.data);
      // Update jobs state to reflect deletion
      setJobs(jobs.filter(job => job._id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
      // Handle error, show error message
    }
  };

  return (
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
              {/* Edit button */}
              <Link to={`/edit/${job._id}`} style={styles.button}>
                Edit
              </Link>
              {/* Delete button */}
              <button onClick={() => handleDelete(job._id)} style={{ ...styles.button, backgroundColor: '#dc3545' }}>
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No jobs found</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#0099ff',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    marginRight: '10px',
    cursor: 'pointer',
    textDecoration: 'none',
    borderRadius: '5px',
  },
};

export default ViewEdit;
