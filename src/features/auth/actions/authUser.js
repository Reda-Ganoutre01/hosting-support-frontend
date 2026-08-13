import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../../services/AuthService";

const authenticateUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const response = await AuthService.authenticate(credentials);
        return response.data;
    } catch (error) {
        const message = 
            error.response?.data?.message || 
            error.response?.data?.error || 
            (typeof error.response?.data === 'string' ? error.response?.data : null) || 
            error.message || 
            "Erreur de connexion";
        return rejectWithValue(message);
    }
});

export default authenticateUser;
