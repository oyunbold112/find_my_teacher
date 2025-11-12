import React from 'react';
import styles from '../styles/CourseCard.module.css';
import { ReservationContext } from '../contexts/reservationContext';
import type { ReservationContextType } from '../components/ReservationPage';
import axios from 'axios';
import { API_URL } from '../contexts/AuthContext';

export interface CourseCardProps {
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

const CourseCard: React.FC<CourseCardProps> = ({ description, id, lesson_duration,  teacher_profile, title, }) => {
  const {reservation_date} = React.useContext(ReservationContext) as ReservationContextType;
  const handleSubmit = () => {
    const data = { 
      lesson: id,
      duration: lesson_duration,
      reservation_time: reservation_date
    }
    try {
      const response = axios.post(`${API_URL}/lessons/reservations/`, data ,{
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('authTokens') || '{}').access}`
        }
      })
      response.then(() => {});
    } catch (error) {
      
    }
  }
  return (
    <div className={styles.card}>
      <img src={teacher_profile.profile_picture} alt={`${teacher_profile.first_name} avatar`} className={styles.avatar} />
      <div className={styles.info}>
        <h4>{title}</h4>
        <p>{description}</p>
        <p className={styles.instructor}>{teacher_profile.first_name} {teacher_profile.last_name}</p>
      </div>
      <button className={styles.button} onClick={handleSubmit}>Хичээл авах</button>
    </div>
  );
};

export default CourseCard;