import AuthReducer from "../features/auth/AuthReducer.js";
import UserReducer from "../features/users/UserReducer.js";
import ticketReducer from "../features/tickets/ticketSlice.js";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    users: UserReducer,
    tickets: ticketReducer,
  },
});

export default store;
