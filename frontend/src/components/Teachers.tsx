import React, { useState, useEffect } from "react";
import teacher_container_bg from "../assets/Group 361.svg";
import exampleteacher from "../assets/teacherppp.svg";
import { API_URL } from "../contexts/AuthContext";
const teachers_url = `${API_URL}/users/`;

// Define an interface for the teacher data structure
interface TeacherData {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

const Teachers: React.FC = ({ children }: React.PropsWithChildren) => {
  // Specify the type for the state variable
  const [teacherdata, setTeacherData] = useState<TeacherData[] | null>(null);

  useEffect(() => {
    fetch(teachers_url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: TeacherData[]) => {
        // Set the state with the fetched data
        setTeacherData(data);

        // Log the 'data' variable directly, as it contains the newly fetched data
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
      });
  }, []);

  // You can use the 'teacherdata' state variable in your JSX here
  // Remember to handle the 'null' initial state
  return (
    <div className="teachers-component-container">
      {teacherdata ? (
        <div className="teachers-container">
          {teacherdata.map((teacher) => (
            <div className="teacher-container">
              <svg
                className="right-arrow"
                xmlns="http://www.w3.org/2000/svg"
                width="184"
                height="187"
                viewBox="0 0 184 187"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M18.3441 73.5203C19.4106 74.4617 21.0959 74.4554 22.1409 73.5214C34.6708 62.6966 47.9024 57.2235 61.4291 57.1499C74.6004 57.0798 87.9413 62.2764 101.063 72.5085C103.98 74.7421 108.496 79.3853 112.478 84.8608C109.194 89.1226 107.021 94.1776 105.963 99.0528C104.403 106.253 105.616 112.886 108.286 116.182C109.765 118.006 111.664 119.129 113.88 119.604C116.715 120.208 120.56 119.7 124.955 116.357C131.017 111.722 132.455 105.07 130.587 97.7322C129.601 93.8748 127.634 89.8224 125.191 85.9253C127.975 83.9329 131.449 82.7893 135.687 83.2275C144.659 84.1003 151.425 90.7458 156.258 98.5494C160.449 105.3 165.51 115.268 164.24 123.163C163.811 125.846 162.518 128.147 164.999 130.354C168.799 133.767 172.239 130.269 172.835 126.584C174.11 118.668 170.904 109.11 167.754 101.786C161.972 88.3096 151.207 76.1617 136.766 74.4245C129.997 73.6381 124.267 75.2261 119.637 78.2056C115.188 72.6835 110.399 68.1094 107.261 65.8102C91.7365 54.6606 76.1511 49.4352 61.1091 50.1462C46.0819 50.8495 31.5459 57.4083 18.3029 70.1099C17.2666 71.0573 17.2776 72.5788 18.3441 73.5203ZM118.714 95.5702C119.667 97.8099 120.315 100.009 120.515 102.098C120.764 104.755 120.209 107.214 117.916 108.953C117.528 109.243 117.055 109.649 116.666 109.939C116.367 109.015 115.847 107.199 115.83 105.699C115.809 102.35 116.63 98.3691 118.308 94.6658C118.47 94.9775 118.599 95.27 118.714 95.5702Z"
                  fill="#FF7426"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M116.26 110.098C115.995 109.964 115.74 109.879 115.762 110.066C115.795 110.302 115.97 110.265 116.26 110.098Z"
                  fill="#FF7426"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M25.724 68.6383C26.9368 66.179 28.1072 63.5618 28.9381 61.0656C30.216 57.1703 30.7517 53.6036 29.6631 51C29.3203 49.7022 27.8598 48.8905 26.4273 49.1974C24.986 49.4908 24.0985 50.7933 24.4562 52.0834C24.5343 52.7265 24.289 53.3923 24.0575 54.141C23.529 55.9059 22.3326 57.7453 21.0307 59.729C19.3664 62.2591 17.3612 64.7851 15.6518 67.1227C14.0963 69.2371 12.8006 71.1997 11.9782 72.7564C10.6795 75.206 10.6217 77.2677 10.927 78.4769C11.0121 78.7927 13.9574 83.4961 18.9305 81.6521C20.7083 80.9874 25.1128 79.0948 25.3303 79.0007C27.9755 77.7092 32.8894 75.3742 37.576 74.1633C39.057 73.7775 40.487 73.436 41.7919 73.3928C41.8617 73.5007 41.9315 73.6085 42.0163 73.7087C43.2452 75.269 45.618 75.6463 47.3504 74.5736C48.3112 74.0603 49.5592 72.6079 49.89 71.7361C50.5244 70.0426 49.7971 68.6732 48.0265 67.536C45.6146 65.992 42.137 65.5368 38.2326 65.8051C34.1293 66.104 29.4863 67.3823 25.724 68.6383ZM21.4392 76.4929C21.1514 77.0009 21.0549 77.3743 21.4481 77.4593C21.8886 77.556 21.5915 76.8819 21.4392 76.4929Z"
                  fill="#FF7426"
                />
              </svg>
              <img className="bg" src={teacher_container_bg} alt="" />
              <div className="info-container">
                <div className="left">
                  <img src={exampleteacher} alt="" />
                </div>
                <div className="right">
                  <h1>{teacher.username}</h1>
                  <p>
                    Туршлагатай, олон жил боловсролын <br />
                    салбарт ажилласан багш, <br />
                    FullStack developer
                  </p>
                  <button className="send-mail-btn">send mail</button>
                </div>
              </div>
            </div>
          ))}
          {children}
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default Teachers;
