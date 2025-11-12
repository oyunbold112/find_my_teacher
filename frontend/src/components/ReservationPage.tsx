import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import axios from "axios";
import { useLessonSearch } from "../hooks/useLessonSearch";
import type { CourseCardProps } from "./CourseCard";
import { API_URL } from "../contexts/AuthContext";
import {
  ReservationContext,
} from "../contexts/reservationContext";

interface lessonTypes {
  name: string;
  display_name: string;
}

interface Mylessons {
  duration: number;
  id: number;
  is_booked: boolean;
  lesson: number;
  lesson_title: string;
  reservation_time: string;
  student: number;
  student_email: string,
  teacher_email: string;
}

interface Filters {
  lesson_type?: string;
  description?: string;
  lesson_duration?: number | null;
}

export interface ReservationContextType {
  reservation_date: string;
  saveReservationDate: (date: string) => void;
}

const ReservationPage = () => {
  const [courses, setCourses] = useState<CourseCardProps[]>([]);
  const [lessontypes, setLessontypes] = useState<lessonTypes[]>([]);
  const [inputLessonType, setType] = useState<string>("");
  const [inputDuration, setDuration] = useState<number | string>("");
  const [inputDescription, setInputDescription] = useState<string>("");
  const [calendarDate, setCalendarDate] = useState(new Date());
  const chosenField = localStorage.getItem("field");
  const { reservation_date, saveReservationDate } = React.useContext(
    ReservationContext
  ) as ReservationContextType;
  const [ mylessons, setMyLessons ] = useState<Mylessons[]>([]);
  const [filters, setFilters] = useState<Filters>({
    lesson_type: "",
    description: "",
    lesson_duration: null,
  });
  const { lessons } = useLessonSearch(filters);
  useEffect(() => {
    async function fetchLessonTypes() {
      try {
        const response = await axios.get(
          `${API_URL}/lessons/lessontypes/`,
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("authTokens") ?? "{}")?.access
              }`,
            },
          }
        );
        setLessontypes(response.data);
      } catch (error) {
        
      }
    }
    async function fetchMyLessons() {
      try {
        const response = await axios.get(
          `${API_URL}/lessons/reservations/`,
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("authTokens") ?? "{}")?.access
              }`,
            }
          })
        setMyLessons(response.data);
      } catch (error) {
        
      }
    }
    fetchLessonTypes();
    fetchMyLessons();
    if (chosenField) {
      setType(chosenField);
    } else {
      
    }

    
  }, []);
  useEffect(() => {
    setCourses(lessons || []);
  }, [lessons]);

  const handleSearch = () => {
    setFilters({
      lesson_type: inputLessonType,
      description: inputDescription,
      lesson_duration: inputDuration,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.id === "lessontype") {
      setType(e.target.value);
    } else {
      if (e.target.value === "") {
        setDuration("");
      }
      else {
      setDuration(parseInt(e.target.value));
      }
    }
  };
  const handleDayClick = (e: React.MouseEvent<HTMLElement>, day: number) => {
    const target = e.target as HTMLElement;
    target.style.backgroundColor = "#f8f8f8";
    if (target.parentElement?.className === "day-container") {
      target.parentElement.style.backgroundColor = "#f8f8f8";
    }
    saveReservationDate(
      new Date(
        calendarDate.getFullYear(),
        calendarDate.getMonth(),
        day + 1
      ).toISOString()
    );
  };
  function getDaysInMonth(year: number, month: number): number {
    // month is 0-indexed: January = 0, December = 11
    return new Date(year, month, 0).getDate();
  }

  const daysInMonth = getDaysInMonth(
    calendarDate.getFullYear(),
    calendarDate.getMonth() + 1
  );
  

  function handleTimeClick(e: React.MouseEvent<HTMLElement>) {
    const target = e.target as HTMLElement;
    const timeString = target.innerHTML.trim(); // "4:30PM"

    // Parse time string
    const [time, modifier] = timeString.split(/(AM|PM)/);
    const [hourStr, minuteStr] = time.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    if (modifier === "PM" && hour < 12) hour += 12;
    if (modifier === "AM" && hour === 12) hour = 0;

    const date = new Date(reservation_date);
    date.setHours(hour + 8);
    date.setMinutes(minute);
    date.setSeconds(0);
    date.setMilliseconds(0);
    console.log(date)
    console.log(hour)
    if (date.toString() == 'Invalid Date') {
      alert("Invalid Date");
      return
    }
    saveReservationDate(date.toISOString());
  }

  function handleMonthChange(e: React.MouseEvent<HTMLElement>) {
    const target = e.target as HTMLElement;
    
    if (
      target.classList[0] === "prev" ||
      target.parentElement?.classList[0] === "prev"
    ) {
      if (calendarDate.getMonth() === 0) {
        setCalendarDate(new Date(calendarDate.getFullYear() - 1, 11));
        return;
      } else {
        setCalendarDate(
          new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1)
        );
        console.log(
          new Date(calendarDate.setMonth(calendarDate.getMonth() - 1))
        );
        
      }
    } else {
      setCalendarDate(
        new Date(calendarDate.setMonth(calendarDate.getMonth() + 1))
      );
    }
  }
  // function booklessoncalendar() {
  //   const currentDate = new Date();
  //   const daysInMonth = getDaysInMonth(
  //     new Date().getFullYear(),
  //     new Date().getMonth()
  //   );
  // }
  
  return (
    <div className="reservation-page-container">
      <div className="reservation-form-container">
        <div className="search-container">
          <h1 className="header">Шинэ бүртгэл</h1>
          <div className="lesson-type-container">
            <h1 className="label">Хичээлийн төрлөө сонгоно уу</h1>
            <select
              id="lessontype"
              value={inputLessonType}
              onChange={handleChange}
            >
              <option value="">Хичээлийн төрлөө сонгоно уу</option>
              {lessontypes.map((type) => (
                <option key={type.name} value={type.name}>
                  {type.display_name}
                </option>
              ))}
            </select>
          </div>
          <div className="lesson-duration-container">
            <h1 className="label">Хугацаа сонгоно уу</h1>
            <select id="duration" value={inputDuration} onChange={handleChange}>
              <option value={""}>Хугацаа сонгоно уу</option>
              <option value="40">40</option>
              <option value="60">60</option>
              <option value="90">90</option>
              <option value="120">120</option>
            </select>
          </div>
          <div className="more-filter-container">
            <h1 className="label">Нэмэлт мэдээлэл</h1>
            <input
              type="text"
              value={inputDescription}
              onChange={(e) => setInputDescription(e.target.value)}
              placeholder="Онцгой шаардлага ,  анхаарах сэдэв,  г.м.:"
            />
          </div>
          <button onClick={handleSearch} id="lesson-search-btn">
            Хичээл хайх
          </button>
        </div>
        <div className="book-lesson-container">
          <div className="header">
            <h1>
              {calendarDate.toLocaleString("default", { month: "long" })}{" "}
              {calendarDate.getFullYear()}
            </h1>
            <div className="prevnext">
              <button onClick={handleMonthChange} className="prev">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="14"
                  viewBox="0 0 18 14"
                  fill="none"
                >
                  <path
                    d="M17 7H1M1 7L7 13M1 7L7 1"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <button className="next" onClick={handleMonthChange}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="14"
                  viewBox="0 0 18 14"
                  fill="none"
                >
                  <path
                    d="M1 7H17M17 7L11 1M17 7L11 13"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="weekdays-container">
            <p>Sun</p>
            <p>Mon</p>
            <p>Tue</p>
            <p>Wed</p>
            <p>Thu</p>
            <p>Fri</p>
            <p>Sat</p>
          </div>
          <div className="days-container">
            {[
              ...Array(
                new Date(
                  calendarDate.getFullYear(),
                  calendarDate.getMonth(),
                  0
                ).getDay()
              ),
            ]
              .map((_, i) => {
                const prevMonthLastDate = new Date(
                  calendarDate.getFullYear(),
                  calendarDate.getMonth(),
                  0
                );
                const day = prevMonthLastDate.getDate() - i;
                return (
                  <div
                    style={{
                      border: "none",
                      backgroundColor: "#eee",
                      color: "#999",
                    }}
                    key={`prev-${i}`}
                    className="day-container"
                  >
                    <p>{day}</p>
                  </div>
                );
              })
              .reverse()}
            {[...Array(daysInMonth)].map((_, i) => (
              <div
                onClick={(event) => handleDayClick(event, i + 1)}
                className="day-container"
                key={i}
              >
                <p>{i + 1}</p>
              </div>
            ))}
          </div>
          <div className="available-hours">
            <h1>Боломжит цагууд</h1>
            <div className="hours">
              <p onClick={handleTimeClick}>9:00 AM</p>
              <p onClick={handleTimeClick}>10:30AM</p>
              <p onClick={handleTimeClick}>12:00PM</p>
              <p onClick={handleTimeClick}>1:30PM</p>
              <p onClick={handleTimeClick}>3:00PM</p>
              <p onClick={handleTimeClick}>4:30PM</p>
            </div>
          </div>
        </div>
      </div>
      {courses.length > 0 && (
        <div className="reservation-result-container">
          <h1 className="header">Хичээл орох боломжит багш нар</h1>
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      )}
      <div className="reservation-mylessons-container">
        <h1 className="header">Миний хичээлүүд</h1>
        <div className="lessons-container">
          {/* <div className="lesson">
            <h1>Кодын хичээл – 1р хэсэг</h1>
            <p>
              2025/11/15, 14:00 цагаас , Хангайхүү багшийн 40 минутын хичээл
            </p>
          </div>
          <div className="lesson">
            <h1>Кодын хичээл – 1р хэсэг</h1>
            <p>
              2025/11/15, 14:00 цагаас , Хангайхүү багшийн 40 минутын хичээл
            </p>
          </div>
          <div className="lesson">
            <h1>Кодын хичээл – 1р хэсэг</h1>
            <p>
              2025/11/15, 14:00 цагаас , Хангайхүү багшийн 40 минутын хичээл
            </p>
          </div>
          <div className="lesson">
            <h1>Кодын хичээл – 1р хэсэг</h1>
            <p>
              2025/11/15, 14:00 цагаас , Хангайхүү багшийн 40 минутын хичээл
            </p>
          </div>
          <div className="lesson">
            <h1>Кодын хичээл – 1р хэсэг</h1>
            <p>
              2025/11/15, 14:00 цагаас , Хангайхүү багшийн 40 минутын хичээл
            </p>
          </div>
          <div className="lesson">
            <h1>Кодын хичээл – 1р хэсэг</h1>
            <p>
              2025/11/15, 14:00 цагаас , Хангайхүү багшийн 40 минутын хичээл
            </p>
          </div>
          <div className="lesson">
            <h1>Кодын хичээл – 1р хэсэг</h1>
            <p>
              2025/11/15, 14:00 цагаас , Хангайхүү багшийн 40 минутын хичээл
            </p>
          </div> */}
          {
            mylessons.map((lesson, index) => (
              <div className="lesson" key={index}>
                <h1>{lesson.lesson_title}</h1>
                <p>{lesson.is_booked}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
