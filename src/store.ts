import { configureStore } from "@reduxjs/toolkit";
import TeamReducer from "./features/teams/teamSlice";

export const store = configureStore({
  reducer: { TeamReducer },
});
