import { createSlice } from "@reduxjs/toolkit";
import authenticateUser from "./actions/authUser.js";
import registerUser from "./actions/registerUser.js";
import { jwtDecode } from "jwt-decode";
import isTokenExpired from "../../lib/isTokenExpired.js";

const TOKEN = localStorage.getItem("token");

const getInitialUser = (token) => {
  if (!token || isTokenExpired(token)) return null;
  try {
    const decoded = jwtDecode(token);
    return {
      role: decoded.role || decoded.roles,
      id: decoded.id || decoded.sub,
      sub: decoded.sub,
    };
  } catch (e) {
    return null;
  }
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    user: getInitialUser(TOKEN),
    token: TOKEN && !isTokenExpired(TOKEN) ? TOKEN : null,
    isAuthenticated: !!(TOKEN && !isTokenExpired(TOKEN)),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("token");
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.loading = false;
        const token = action.payload?.token || action.payload?.jwt || action.payload?.accessToken || (typeof action.payload === 'string' ? action.payload : null);
        if (token) {
          state.token = token;
          try {
            const decodedToken = jwtDecode(token);
            const loginEmail = action.meta?.arg?.email || action.meta?.arg?.username || decodedToken.sub || decodedToken.email;
            state.user = {
              email: loginEmail,
              name: loginEmail ? loginEmail.split("@")[0] : "Utilisateur Vala",
              role: decodedToken.role || decodedToken.roles || "USER",
              id: decodedToken.id || decodedToken.sub,
              sub: decodedToken.sub,
              ...action.payload.user
            };
          } catch (e) {
            const loginEmail = action.meta?.arg?.email || action.meta?.arg?.username;
            state.user = action.payload.user || { email: loginEmail, name: loginEmail?.split("@")[0] || "Utilisateur Vala" };
          }
          state.isAuthenticated = true;
          state.error = null;
          localStorage.setItem("token", token);
        } else {
          state.error = "Format de réponse invalide reçu du serveur";
        }
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : (action.payload?.message || "Échec de la connexion");
      });

    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        const token = action.payload?.token || action.payload?.jwt || action.payload?.accessToken || (typeof action.payload === 'string' ? action.payload : null);
        if (token) {
          state.token = token;
          try {
            const decodedToken = jwtDecode(token);
            const regEmail = action.meta?.arg?.email || decodedToken.sub || decodedToken.email;
            state.user = {
              email: regEmail,
              name: action.meta?.arg?.fullName || regEmail?.split("@")[0] || "Utilisateur Vala",
              role: decodedToken.role || decodedToken.roles || "USER",
              id: decodedToken.id || decodedToken.sub,
              sub: decodedToken.sub,
              ...action.payload.user
            };
          } catch (e) {
            const regEmail = action.meta?.arg?.email;
            state.user = action.payload.user || { email: regEmail, name: action.meta?.arg?.fullName || "Utilisateur Vala" };
          }
          state.isAuthenticated = true;
          state.error = null;
          localStorage.setItem("token", token);
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : (action.payload?.message || "Échec de l'inscription");
      });
  },
});

export const { logout, clearError } = AuthSlice.actions;
const AuthReducer = AuthSlice.reducer;
export default AuthReducer;
