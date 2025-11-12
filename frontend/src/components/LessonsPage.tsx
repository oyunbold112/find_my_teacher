import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const lessons_url = "http://127.0.0.1:8000/api/lessons/lessons";

interface LessonData {
  title: string;
  description: string;
  teacher: {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  };
}

const LessonsPage: React.FC = () => {
  const [lessons, setLessons] = useState<LessonData[]>([]);
  const [loading, setLoading] = useState(true);
  const { authTokens } = useAuth();
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(lessons_url, {
          headers: {
            "Content-Type": "application/json",
            Authorization:`Bearer ${authTokens?.access}`,
          },
        });
        setLessons(response.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    if (authTokens) {
      fetchLessons();
    }
  }, [authTokens]);
  if (loading) {
    return <div>Ачааллаж байна...</div>;
  }
  return (
    <div className="lessons-page-container">
      {lessons ? (
        <div className="lessons-container">
          {lessons.map((lesson) => (
            <div className="lesson-container">
              <h1>{lesson.title}</h1>
              <h2>
                Teacher: {lesson.teacher.first_name} {lesson.teacher.last_name}
              </h2>
              <p>Description: {lesson.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default LessonsPage;
