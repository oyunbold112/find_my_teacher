import React from "react";
import styles from "../styles/CourseCard.module.css";
import { ReservationContext } from "../contexts/reservationContext";
import type { ReservationContextType } from "../components/ReservationPage";
import axios from "axios";
import { API_URL } from "../contexts/AuthContext";
import teacheravatar from "../assets/proteacherone.svg";
export interface CourseCardProps {
  onBook: () => void;
  description: string;
  id: number;
  teacher: number;
  teacher_email: string;
  teacher_profile: {
    first_name: string;
    last_name: string;
    profile_picture: string;
    user_type_display: string;
  };
  lesson_duration: string;
  title: string;
  date: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  onBook,
  description,
  id,
  lesson_duration,
  teacher_profile,
  title,
}) => {
  const [isReserved, setIsReserved] = React.useState(false);
  const { reservation_date } = React.useContext(
    ReservationContext,
  ) as ReservationContextType;
  const handleSubmit = async () => {
    const data = {
      lesson: id,
      duration: lesson_duration,
      reservation_time: reservation_date,
    };

    try {
      const response = await axios.post(
        `${API_URL}/lessons/reservations/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("authTokens") || "{}").access}`,
          },
        },
      );
      setIsReserved(true);
      onBook();
      alert("Хичээл захиалга амжилттай боллоо.");
      console.log("Reservation successful:", response);
    } catch (error) {
      console.error("Error making reservation:", error);
      alert("Захиалга амжилтгүй боллоо.");
    }
  };

  return (
    <div
      style={{
        height: description.length > 100 ? "200px" : "140px",
      }}
      className={styles.card}
    >
      <img
        src={teacheravatar}
        alt={`${teacher_profile.first_name} avatar`}
        className={styles.avatar}
      />
      <div className={styles.info}>
        <h4>{title}</h4>
        <p className={styles.description}>{description}</p>
        <p className={styles.instructor}>
          {teacher_profile.first_name} {teacher_profile.last_name}
        </p>
      </div>
      <button className={styles.button} onClick={handleSubmit}>
        Хичээл авах
      </button>
    </div>
  );
};

export default CourseCard;
