import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import video from '../LoginAsset/video.mp4';
import logo from '../LoginAsset/logo.jpg';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import axios from 'axios';

const Login = () => {
  const [loginUserName, setLoginUserName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const loginUser = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');
    
    try {
      console.log('Attempting login...');
      
      const response = await axios.post('http://localhost:3002/login', {
        LoginUserName: loginUserName,
        LoginPassword: loginPassword
      });

      console.log('Login response:', response.data);

      // SIMPLIFIED NAVIGATION - Try different response checks
      if (response.status === 200) {
        console.log('Login successful! Navigating to dashboard...');
        navigate('/dashboard');
        return;
      }

      // If we get here, something unexpected happened
      setErrorMessage('Login successful but navigation failed');

    } catch (error) {
      console.error('Login error:', error);
      
      if (error.response) {
        // Server responded with error status
        console.log('Error response data:', error.response.data);
        console.log('Error status:', error.response.status);
        
        setErrorMessage(error.response.data.message || `Login failed (Status: ${error.response.status})`);
      } else if (error.request) {
        // Request was made but no response received
        console.log('No response received:', error.request);
        setErrorMessage('Network error. Please check your connection.');
      } else {
        // Other errors
        console.log('Error message:', error.message);
        setErrorMessage('An unexpected error occurred: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='loginPage flex'>
      <div className='container flex'>
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>
          <div className="textDiv">
            <h2 className="title">Create and Sell Extraordinary Products</h2>
            <p>Add a piece of natural</p>
          </div>

          <div className='footerDiv flex'>
            <span className='text'>Don't have an account</span>
            <Link to='/register'>
              <button className='btn'>Sign Up</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo" />
            <h3>Welcome Back</h3>
          </div>

          <form className='form grid' onSubmit={loginUser}>
            {/* Error message display */}
            {errorMessage && (
              <div className="error-message" style={{color: 'red', padding: '10px', background: '#ffe6e6', borderRadius: '5px'}}>
                {errorMessage}
              </div>
            )}

            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className="input flex">
                <FaUserShield className='icon'/>
                <input
                  type="text"
                  id='username'
                  placeholder='Enter username'
                  value={loginUserName}
                  onChange={(e) => setLoginUserName(e.target.value)}
                  required
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
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <button 
              type='submit' 
              className='btn flex'
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
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
  )
}

export default Login;