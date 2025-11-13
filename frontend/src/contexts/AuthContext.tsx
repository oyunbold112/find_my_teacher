// src/contexts/AuthContext.tsx
import {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// ... (Энд Context-ийн бүх код орно)
export const API_URL = "https://findmyteacher-production-daae.up.railway.app/api";
interface AuthTokens {
  access: string;
  refresh: string;
}
interface User {
  pk: number;
  username: string;
  email: string;
  role: "teacher" | "student";
}
interface AuthContextType {
  user: User | null;
  authTokens: AuthTokens | null;
  loginUser: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  logoutUser: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
interface AuthProviderProps {
  children: ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const navigate = useNavigate();
    const [authTokens, setAuthTokens] = useState<AuthTokens | null>(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens")!)
      : null
  );
  const [user, setUser] = useState<User | null>(() =>
    localStorage.getItem("authTokens") /* Decode token here or fetch user */
      ? null
      : null
  );
  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };
    console.log(e)
    console.log(target);
    try {
      const response = await axios.post(`${API_URL}/auth/login/`, {
        username: target.username.value,
        password: target.password.value,
      });
 
      const data = response.data;
      setAuthTokens(data);
      setUser(data.user); // Assuming login returns user details
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
    } catch (error) {
        console.error(error);
      alert("Нэвтрэхэд алдаа гарлаа!");
    }
  };
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };
  const contextData: AuthContextType = {
    user,
    authTokens,
    loginUser,
    logoutUser,
  };
  // TODO: Add token refresh logic inside a useEffect
  useEffect(() => {
  const refreshToken = async () => {
    if (authTokens?.refresh) {
      try {
        const response = await axios.post(`${API_URL}/auth/token/refresh/`, {
          refresh: authTokens.refresh,
        });
        const newTokens = {
          access: response.data.access,
          refresh: authTokens.refresh, // reuse the existing refresh token
        };
        setAuthTokens(newTokens);
        localStorage.setItem("authTokens", JSON.stringify(newTokens));
      } catch (error) {
        logoutUser(); // if refresh fails, log out
      }
    }
  };

  const interval = setInterval(() => {
    refreshToken();
  }, 1000 * 60 * 4); // refresh every 4 minutes

  return () => clearInterval(interval);
}, [authTokens]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
