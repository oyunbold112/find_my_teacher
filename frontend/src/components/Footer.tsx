import React from "react";
import "../styles/footer.css";
import links from "../assets/links.png";
import logo from "../assets/Group.png";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2 className="logo"><img src={logo} width={10} alt="logo" />Tutor</h2>
          <p className="desc">
            Бол сургалтад багш нарын нэр, цагийн хуваарь, завдал хичээлээ харах боломж олгодог онлайн платформ юм.
          </p>
          <div className="socials">
            <img src={links} alt="Tutor links" className="footer-link" />
          </div>
        </div>

        <div className="footer-section">
          <h3>Contact Info</h3>
          <ul>
            <li>📞 89908888</li>
            <li>🌐 education.com</li>
            <li>📍 4808 MN Tower Mongolia<br/>Ylalt Square, OR 97429</li>
          </ul>
        </div>

        <div className="footer-section">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21391.92756591655!2d106.90962604999999!3d47.91721265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d969366c8b6b9a7%3A0x46313f3d850bf7cc!2sMN%20Tower%20Mongolia!5e0!3m2!1smn!2smn!4v1755920884665!5m2!1smn!2smn"
            width="100%"
            height="150"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="bottom-bar">
        tutor All Right Reserved, 2025
      </div>
    </footer>
  );
};

export default Footer;
