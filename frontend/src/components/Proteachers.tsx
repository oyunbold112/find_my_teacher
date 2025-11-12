import React from "react";
import image3 from "../assets/proteacherthree.svg";
import image2 from "../assets/proteachertwo.svg";
import image1 from "../assets/proteacherone.svg";
import instalogo from "../assets/instalogo.svg";
import inlogo from "../assets/linkedin.svg";
import lampimg from '../assets/casual-life-3d-idea-lamp 1.svg';
import curly_arrow from '../assets/curly-arrow-blue.svg';

const Proteachers: React.FC = () => {
  return (
    <div className="proteachers-component-container">
        <img src={lampimg} alt="" className="lamp" />
        <img src={curly_arrow} alt="" className="arrow" />
      <div className="header">
        <h1 className="title">Teachers</h1>
        <p className="small-title">Mэргэжлийн багшнар</p>
      </div>
      <div className="three-teachers-container">
        <div className="teacher">
          <img src={image1} alt="" />
          <h1>Matthew E. McNatt</h1>
          <h2>Professor @George Brown College</h2>
          <h3>
            Ut enim ad minim veniam, quis nost exercitation ullamco laboris nisi
            ut allquip ex commodo.
          </h3>
          <h4>Full-Stack Developer</h4>
          <div className="social">
            <img src={instalogo} alt="" />
            <img src={inlogo} alt="" />
          </div>
        </div>
        <div className="teacher">
          <img src={image2} alt="" />
          <h1>Tracy D. Wright</h1>
          <h2>Professor @George Brown College</h2>
          <h3>
            Ut enim ad minim veniam, quis nost exercitation ullamco laboris nisi
            ut allquip ex commodo.
          </h3>
          <h4>Web developer</h4>
          <div className="social">
            <img src={instalogo} alt="" />
            <img src={inlogo} alt="" />
          </div>
        </div>
        <div className="teacher">
          <img src={image3} alt="" />
          <h1>Cynthia A. Nelson</h1>
          <h2>Professor @George Brown College</h2>
          <h3>
            Ut enim ad minim veniam, quis nost exercitation ullamco laboris nisi
            ut allquip ex commodo.
          </h3>
          <h4>Engiinering physics</h4>
          <div className="social">
            <img src={instalogo} alt="" />
            <img src={inlogo} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proteachers;
