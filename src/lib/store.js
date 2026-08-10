
import AuthReducer from "../features/auth/AuthReducer.js";
import UserReducer from "../features/users/UserReducer.js";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    users: UserReducer,
  },
});

export default store;
