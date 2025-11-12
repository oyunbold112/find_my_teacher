import React from "react";
import onlinetestimg from "../assets/online-test 1.svg";
import examimg from "../assets/exam 1.svg";
import certificateimg from "../assets/certification 1.svg";
const Menufooter: React.FC = () => {
  return (
    <div className="menu-footer-component-container">
      <div className="div">
        <img src={onlinetestimg} alt="" />
        <div className="right">
          <h1>Бүх хичээлүүд</h1>
          <p>
            Бүх хичээлүүдийг тухайн салбарын туршлагатай мэргэжилтнүүд заадаг
            бөгөөд тухайн сэдвийн ур чадварыг <br />хөгжүүлдэг.
          </p>
        </div>
      </div>
      <div className="div">
        <img src={examimg} alt="" />
        <div className="right">
          <h1>Мэргэжлийн багш</h1>
          <p>
            Чамд багш хэрэгтэй үед мэргэжлийн багштай холбогдох хамгийн хялбар
            арга. Хэрэв шаардлагатай бол мэргэжлийн багш руу хамгийн
            тохиромжтойгоор
          </p>
        </div>
      </div>
      <div className="div">
        <img src={certificateimg} alt="" />
        <div className="right">
          <h1>Тохиромжтой цаг</h1>
          <p>Сурагч багшийн аль алинд тохирсон цагт хичээлээ товлож болно.</p>
        </div>
      </div>
    </div>
  );
};

export default Menufooter;
