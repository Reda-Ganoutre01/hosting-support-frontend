import axios from "axios";
import { env } from "../config/env";

const API_BASE_URL = env.apiBaseUrl || "/api/v1";

class UserService {
  constructor() {
    this.http = axios.create({ baseURL: `${API_BASE_URL}/users` });

    this.http.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        console.log("Authorization Token:", token);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  async getUsers() {
    return this.http.get("/");
  }

  async getUserById(id) {
    return this.http.get(`/${id}`);
  }

  async createUser(user) {
    console.log("Creating User with Payload:", user);
    return this.http.post("/create", user);
  }
  async updateUser(id, user) {
    return this.http.put(`/update/${id}`, user);
  }

  async deleteUser(id) {
    return this.http.delete(`/delete/${Number(id)}`);
  }
}

export default new UserService();
