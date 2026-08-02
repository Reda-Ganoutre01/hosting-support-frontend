import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import AppLayout from "../components/layout/AppLayout";


const getToken= ()=> localStorage.getItem("token");

function RequireAuth ({children}){
  if(!getToken()) return <Navigate to="/login" replace />;
  return children;
}

export default function Router(){
   return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <RequireAuth>
            <AppLayout>
              <div className="p-6">Welcome to Hosting Support Platform</div>
            </AppLayout>
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
