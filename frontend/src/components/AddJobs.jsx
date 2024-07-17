import React, { useState } from 'react';
import axios from 'axios'; // For making HTTP requests
import { useNavigate } from 'react-router-dom';

const AddJobForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    salary: '',
  });

  const navigate = useNavigate();

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
      const response = await axios.post('http://localhost:3000/add-new-job', formData);

      console.log('Job created:', response.data);
      // Optionally, redirect or show success message
      if (response.status === 201) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error creating job:', error);
      // Handle error, show error message
    }
  };

  const sendEdit=()=>{
    navigate("/view")
  }

  return (
    <>
    <div style={styles.editout}><button style={styles.editin} onClick={sendEdit}>Edit Jobs</button></div>
    <div style={styles.container}>
      <h2>Add New Job</h2>
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
        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
</>
  );
};

const styles = {
  editout:{
    textAlign:'center',
    margin:'10px 5px',
    padding:'10px',
  },
  editin:{
    margin:'10px 5px',
    padding:'10px',
    color:'white',
    borderRadius:'15px',
    width:'140px',
    backgroundColor:'#0099ff',
    border:'20px'

  },
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

export default AddJobForm;
