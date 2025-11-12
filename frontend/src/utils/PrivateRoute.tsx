// src/utils/PrivateRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
const PrivateRoute = () => {
const { user } = useAuth();
console.log(user)
return user ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute;