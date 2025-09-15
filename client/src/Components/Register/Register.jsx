import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import video from '../LoginAsset/video.mp4';
import logo from '../LoginAsset/logo.jpg';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import { MdMarkEmailRead } from "react-icons/md";
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const createUser = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');
    
    try {
      const response = await axios.post('http://localhost:3002/register', {
        Email: email,
        Username: username,
        Password: password
      });

      console.log('Registration response:', response.data);

      // Redirect to dashboard on successful registration
      if (response.status === 200 || response.status === 201) {
        console.log('User created successfully! Redirecting to dashboard...');
        navigate('/dashboard');
      } else {
        setErrorMessage('Registration completed but unable to redirect');
      }

    } catch (err) {
      console.error('Error creating user:', err);
      
      if (err.response) {
        setErrorMessage(err.response.data.message || `Registration failed (Status: ${err.response.status})`);
      } else if (err.request) {
        setErrorMessage('Network error. Please check your connection.');
      } else {
        setErrorMessage('An unexpected error occurred: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='registerPage flex'>
      <div className='container flex'>
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>
          <div className="textDiv">
            <h2 className="title">Create And Sell</h2>
            <h2 className="title">Extraordinary</h2>
            <h2 className="title">Products</h2>
          </div>

          <div className='footerDiv flex'>
            <span className='text'>Have an account?</span>
            <Link to='/login'>
              <button className='btn'>Login</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo" />
            <h3>Let us know you!</h3>
          </div>

          <form className='form grid' onSubmit={createUser}>
            {/* Error message display */}
            {errorMessage && (
              <div className="error-message" style={{color: 'red', padding: '10px', background: '#ffe6e6', borderRadius: '5px'}}>
                {errorMessage}
              </div>
            )}

            <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <div className="input flex">
                <MdMarkEmailRead className='icon'/>
                <input 
                  type="email" 
                  id='email' 
                  placeholder='Enter Email' 
                  required 
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className="input flex">
                <FaUserShield className='icon'/>
                <input 
                  type="text" 
                  id='username' 
                  placeholder='Enter Username' 
                  required 
                  value={username}
                  onChange={(e)=>setUsername(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className='icon'/>
                <input 
                  type="password" 
                  id='password' 
                  placeholder='Enter Password' 
                  required 
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <button 
              type='submit' 
              className='btn flex'
              disabled={loading}
            >
              <span>{loading ? 'Creating Account...' : 'Register'}</span>
              {!loading && <AiOutlineSwapRight className="icon"/>} 
            </button>

            {/* Temporary direct link for testing */}
            <div style={{marginTop: '10px', textAlign: 'center'}}>
              <Link to="/dashboard" style={{color: '#007bff'}}>
                Test: Go directly to Dashboard
              </Link>
            </div>
            
            <span className="forgotPassword">
              Forgot your password? <a href='#!'>Click here</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;