import React, { useState } from "react";
import login_banner from "../assets/Frame 2.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

function RegisterPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      await axios.post('/api/teachers/', {
        username,
        email,
        password
      });
      navigate('/login')
    }
    catch(error){
      console.error(`Registration failed. ${error}`)
    }
  }
  return (
    <div className="register-page-container">
      <div className="register-banner-container">
        <img src={login_banner} alt="" className="register-banner" />
      </div>
      <div className="register-container">
        <div className="title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="59"
            height="52"
            viewBox="0 0 59 52"
            fill="none"
          >
            <path
              d="M29.343 10.65L46.1414 0.780273V9.36441L29.343 10.65Z"
              fill="#B8E8F2"
            />
            <path
              d="M29.343 10.6499L49.723 3.09424V9.21545L29.343 10.6499Z"
              fill="#88CFE5"
            />
            <path
              d="M29.343 10.6501L7.51056 0V8.34957L29.343 10.6501Z"
              fill="#B8E8F2"
            />
            <path
              d="M29.343 10.6502L2.90948 1.92627V7.81292L29.343 10.6502Z"
              fill="#88CFE5"
            />
            <path
              d="M29.3791 51.8476L0.0315758 46.1685L0 4.96191L29.3475 10.6456L29.3791 51.8476Z"
              fill="#472758"
            />
            <path
              d="M58.7943 34.0297C58.7943 41.3192 53.0746 47.1968 45.997 48.5772L29.3475 51.8159L29.343 10.65L44.8603 7.63224C51.7664 6.28801 57.3779 9.84256 57.3779 16.9607C57.3779 20.3709 56.0743 23.33 53.9271 25.6891C56.8682 27.0514 58.7898 29.8527 58.7943 34.0297ZM38.4053 17.7095V24.999L44.8603 23.7405C46.8992 23.3435 48.3156 21.5392 48.3156 19.4236C48.3156 17.308 46.9579 16.045 44.8603 16.4509L38.4053 17.7095ZM49.732 35.0852C49.732 32.7937 48.2615 31.4315 45.9925 31.8735L38.4053 33.3486V41.229L45.9925 39.754C48.2615 39.3164 49.732 37.3813 49.732 35.0852Z"
              fill="#4D2C5E"
            />
          </svg>
          <h1>Register for eLearn</h1>
        </div>
        <form onSubmit={handleSubmit} className="register-form-container">
          <div className="username-container container">
            <input type="text" placeholder="username" className="username" value={username} 
            onChange={(e) => {
              setUsername(e.target.value)
            }}
            />
          </div>
          <div className="email-container container">
            <input type="text" placeholder="Email Address" className="email" value={email} 
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            />
          </div>
          <div className="phoneaddress-container container">
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }} 
              className="numberadress"
            />
          </div>
          <button type="submit" className="register-button">Send</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;