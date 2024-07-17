import React from 'react';
import './styles/form.css';
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const navigate = useNavigate();

  const sendSign=()=>{
    navigate('/sign');
  }
  
  return (
    <div className="form-container">
      <h2>Login</h2>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" placeholder="Enter your email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" placeholder="Enter your password" required />
        </div>
        <button type="submit" className="btn">Login</button>
      </form>
      <p>Don't have an account <button onClick={sendSign}>Sign up</button></p>
    </div>
  );
};

export default Login;
