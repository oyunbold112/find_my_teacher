import { useState, useEffect } from "react";
import axios from "axios";

interface Lesson {
  id: number;
  title: string;
  lesson_description: string;
  teacher_name: string;
  lesson_duration: number;
  lesson_type: string;
}

interface Filters {
  lesson_type?: string;
  description?: string;
  lesson_duration?: number | string;
}

export function useLessonSearch(filters: Filters) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = "https://findmyteacher-production-daae.up.railway.app/api";

  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      setError(null);
      const hasFilters =
        filters &&
        (filters.lesson_type != "" ||
          filters.description != "" ||
          filters.lesson_duration != null);
      if (hasFilters) {
        try {
          console.log(filters.lesson_duration);
          const response = await axios.get(
            `${API_URL}/lessons/lessons/`,
            {
              headers: {
                Authorization: `Bearer ${
                  JSON.parse(localStorage.getItem("authTokens") || "{}").access
                }`,
              },
              params: {
                lesson_type: filters.lesson_type,
                description: filters.description,
                lesson_duration:
                  filters.lesson_duration === null
                    ? null
                    : filters.lesson_duration,
              },
            }
          );
          setLessons(response.data);
        } catch (err: any) {
          setError(
            err.response?.data?.detail || err.message || "Unknown error"
          );
        } finally {
          setLoading(false);
        }
      }
    };

    fetchLessons();
  }, [filters]);

  return { lessons, loading, error };
}
