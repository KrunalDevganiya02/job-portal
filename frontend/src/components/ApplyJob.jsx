import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ApplyJob = () => {
  const { id } = useParams(); // Extract job ID from URL parameters
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    experience: '',
    resume: null,
    coverLetter: '',
    education: '',
    skills: '',
    linkedin: '',
    portfolio: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === 'resume') {
      setFormData({ ...formData, resume: e.target.files[0] });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataWithFile = new FormData();
      formDataWithFile.append('jobId', id);
      formDataWithFile.append('name', formData.name);
      formDataWithFile.append('email', formData.email);
      formDataWithFile.append('mobile', formData.mobile);
      formDataWithFile.append('experience', formData.experience);
      formDataWithFile.append('resume', formData.resume);
      formDataWithFile.append('coverLetter', formData.coverLetter);
      formDataWithFile.append('education', formData.education);
      formDataWithFile.append('skills', formData.skills);
      formDataWithFile.append('linkedin', formData.linkedin);
      formDataWithFile.append('portfolio', formData.portfolio);

      const response = await axios.post('http://localhost:3000/apply', formDataWithFile, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Job application submitted:', response.data);
      setLoading(false);
      // Optionally, redirect or show success message
    } catch (error) {
      console.error('Error submitting job application:', error);
      setLoading(false);
      // Handle error, show error message
    }
  };

  return (
    <div style={styles.container}>
      <h2>Apply for Job</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>
        <br />
        <label style={styles.label}>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>
        <br />
        <label style={styles.label}>
          Mobile:
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>
        <br />
        <label style={styles.label}>
          Experience:
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>
        <br />
        <label style={styles.label}>
          Education:
          <input
            type="text"
            name="education"
            value={formData.education}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>
        <br />
        <label style={styles.label}>
          Skills:
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>
        <br />
        <label style={styles.label}>
          LinkedIn Profile:
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            style={styles.input}
          />
        </label>
        <br />
        <label style={styles.label}>
          Portfolio:
          <input
            type="url"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleChange}
            style={styles.input}
          />
        </label>
        <br />
        <label style={styles.label}>
          Resume:
          <input
            type="file"
            name="resume"
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>
        <br />
        <label style={styles.label}>
          Cover Letter:
          <textarea
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            style={{ ...styles.input, ...styles.textarea }}
          />
        </label>
        <br />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
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

export default ApplyJob;
