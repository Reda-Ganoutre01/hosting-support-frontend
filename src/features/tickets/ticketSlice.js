import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TicketService from "@/services/TicketService.js";

export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async (_, { rejectWithValue }) => {
    try {
      const response = await TicketService.getTickets();
      return Array.isArray(response.data) ? response.data : response.data?.content || [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Erreur de chargement des tickets");
    }
  }
);

export const createTicket = createAsyncThunk(
  "tickets/createTicket",
  async (ticketData, { rejectWithValue }) => {
    try {
      const response = await TicketService.createTicket(ticketData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Erreur de création de ticket");
    }
  }
);

const ticketSlice = createSlice({
  name: "tickets",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      });
  },
});

export default ticketSlice.reducer;
