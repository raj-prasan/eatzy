import {Navigate, Outlet, useLocation} from 'react-router-dom'
import { useAppData } from '../context/AppContext'
const ProtectedRoute= ()=>{
  const {isAuth,user, loading} = useAppData();
   const location = useLocation()
  if(loading) return null;
  console.log("User:", user);
  console.log("Role:", user?.role);

  if(!isAuth){
    return <Navigate to="/login" replace/>
  }
  if (isAuth && user && user.role === null && location.pathname !== "/select-role") {
  return <Navigate to="/select-role" replace />;
}
  if (isAuth && user && user.role !== null && location.pathname === "/select-role") {
  return <Navigate to="/" replace />;
}
  return <Outlet/>
}
export default ProtectedRoute