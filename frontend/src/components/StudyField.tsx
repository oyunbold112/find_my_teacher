import { useEffect } from "react";
import banner_image from "../assets/study_field_banner.png";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../contexts/AuthContext";

interface Field {
  name: string;
  display_name: string;
}

const StudyField: React.FC = () => {
  const navigate = useNavigate();
  const [field, setField] = React.useState<string>("");
  const [fields, setFields] = React.useState<Field[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setField(e.target.value);
  const handleClick = () => {
    localStorage.setItem("field", field);
    navigate("/reservation");
  };
  useEffect(() => {
    async function fetchData() {
      if (0 == 0) {
        try {
          const response = await axios.get(
            `${API_URL}/lessons/lessontypes/`,
            {
              headers: {
                Authorization: `Bearer ${
                  JSON.parse(localStorage.getItem("authTokens"))?.access
                }`,
              },
            }
          );
          console.log(response.data);
          const data = response.data;
          setFields(data);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("uh um no no no");
      }
    }
    fetchData();
  }, []);
  return (
    <div className="study-field-component-container">
      <img src={banner_image} alt="" />
      <div className="left">
        <h1>
          Таны <span>суралцахыг</span> хүссэн салбар
        </h1>
        <div className="search-container">
          <select title="" onChange={handleChange} name="Field" id="select-field">
            <option value="default">Таны суралцах салбар</option>
            {fields.map((f) => (
              <option key={f.display_name} value={f.display_name}>
                {f.display_name}
              </option>
            ))}
          </select>
          <button onClick={handleClick} className="field-search-btn">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudyField;