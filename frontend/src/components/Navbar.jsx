import React from 'react'
import "./styles/navbar.css";
import { useNavigate } from 'react-router-dom';


function Navbar() {
  const navigate = useNavigate();
  const send=()=>{
    navigate('/');
  }
  const sendLogin=()=>{
    navigate('/log');
  }
  const sendJob=()=>{
    navigate('/add');
  }
  const sendSearch=()=>{
    navigate('/search');
  }
  return (
    <div className='navbar'>
        <div className="logo">
          <h2 onClick={send}>
          Find Dream
          </h2>
          </div>
        <div className="button">
            <button onClick={sendSearch} className='navbtn btn1'> Search </button>
            <button onClick={sendLogin} className='navbtn btn1'>Login</button>
            <button onClick={sendJob} className='navbtn btn2'>Add Jobs</button>
        </div>
    </div>
  )
}

export default Navbar