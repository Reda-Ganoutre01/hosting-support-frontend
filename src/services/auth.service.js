import api from './api';

const authService = {
  register :(payload) => api.post("/auth/register",payload),
  Login :(payload) => api.post("/auth/login",payload),
  me:() => api.get("/auth/me"),
  logout : ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

}
