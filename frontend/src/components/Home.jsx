import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
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

  return (
    <div style={styles.container}>
      <main style={styles.mainContent}>
        <div style={styles.intro}>
          <h1>Find Your Dream Job</h1>
          <p>Discover thousands of job opportunities with Job Finder.</p>
        </div>

        <section style={styles.featuredJobs}>
          <h2>Featured Jobs</h2>
          <div style={styles.jobsList}>
            {jobs && jobs.length > 0 && jobs.map((job) => (
              <div key={job._id} style={styles.jobCard}>
                <h3>{job.title}</h3>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Salary:</strong> ${job.salary}</p>
                <p><strong>Description:</strong> {job.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'lightblue',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    fontSize: '24px',
    color: '#fff',
  },
  nav: {},
  navList: {
    listStyle: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: '0 10px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
  },
  intro: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  featuredJobs: {
    textAlign: 'center',
  },
  jobsList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
  },
  jobCard: {
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '20px',
    width: '300px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  footer: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    textAlign: 'center',
    padding: '10px 0',
    boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)',
  },
};

export default Home;
