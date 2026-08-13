import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../../services/UserService";

const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (payload, { rejectWithValue }) => {
    try {
      await UserService.deleteUser(payload.id);
      return payload.id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export default deleteUser;
