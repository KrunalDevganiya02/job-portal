import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditJobs = () => {
  const { id } = useParams(); // Get job ID from URL params
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    salary: '',
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/jobs/${id}`);
        const jobData = response.data;
        setFormData(jobData);
      } catch (error) {
        console.error('Failed to fetch job:', error);
        // Handle error, show error message to user
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:3000/jobs/${id}`, formData);
      console.log('Job updated:', response.data);
      // Optionally, redirect or show success message
      if (response.status === 200) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error updating job:', error);
      // Handle error, show error message
    }
  };

  return (
    <div style={styles.container}>
      <h2>Update Job</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>
        <br />
        <label style={styles.label}>
          Company:
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>
        <br />
        <label style={styles.label}>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            style={styles.input}
          />
        </label>
        <br />
        <label style={styles.label}>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ ...styles.input, ...styles.textarea }}
          />
        </label>
        <br />
        <label style={styles.label}>
          Salary:
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            style={styles.input}
          />
        </label>
        <br />
        <button type="submit" style={styles.button}>Update Job</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '10px',
    fontSize: '16px',
  },
  input: {
    padding: '8px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '3px',
    width: '100%',
  },
  textarea: {
    minHeight: '100px',
    resize: 'vertical',
  },
  button: {
    backgroundColor: '#0099ff', // Blue button
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default EditJobs;
