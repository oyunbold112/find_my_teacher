import React from "react";
import profile_icon from "../assets/profile-icon.svg";
import { Link, useLocation } from "react-router-dom";


const Header: React.FC = () => {
  const location = useLocation();
  const isCoursePage = location.pathname === "/reservation"; // Check if the current page is the course page
  return (
    <div className="header-menu-container" style={{ backgroundColor: isCoursePage ? '#4d2c5e' : '#fdf8ee' }}>
      <h1 className="logo" style={{ color: isCoursePage ? '#fff' : '#4d2c5e' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="57"
          viewBox="0 0 30 57"
          fill="none"
        >
          <path
            d="M29.343 12.2842L7.51056 0.870667V9.81872L29.343 12.2842Z"
            fill="#B8E8F2"
          />
          <path
            d="M29.343 12.2842L2.9095 2.93488V9.24348L29.343 12.2842Z"
            fill="#88CFE5"
          />
          <path
            d="M29.3791 56.4347L0.0315758 50.3485L0 6.18829L29.3475 12.2794L29.3791 56.4347Z"
            fill="#472758"
          />
        </svg>
        Tutor
      </h1>
      <div className="nav" >
        <Link to="/" style={{ color: isCoursePage ? '#fff' : '#4d2c5e' }}>Home</Link>
        <Link style={{ color: isCoursePage ? '#fff' : '#4d2c5e' }} to="/teachers">
          Teachers
        </Link>
        <Link style={{ color: isCoursePage ? '#fff' : '#4d2c5e' }} to="/reservation">
          Courses
        </Link>
        <Link style={{ color: isCoursePage ? '#fff' : '#4d2c5e' }} to="/contact">
          Contact Us
        </Link>
      </div>
      <div className="profile-and-signin">
        <div className="profile" style={{ border: isCoursePage ? ' 0.2vw solid #fff' : '#4d2c5e'}}>
          <img src={profile_icon} alt="" className="profile-icon" />
        </div>
        <div className="sign-in">
          <Link className="signin-link" to="/login">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
