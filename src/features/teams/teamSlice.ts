import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState: TeamState = {
  teams: [],
};

export const TeamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    ADD_ITEM_TO_CART: (state, action: PayloadAction<Team>) => {
      const item = state.teams.find((el) => el.id === action.payload.id);
      if (state?.teams?.length >= 6) {
        toast.warning("Only 6 pokemon can be added in team.");
        return;
      }
      
      if (item) {
        toast.warning("This Pokemon is already in the team.");
        return;
      }
      state.teams.push({ ...action?.payload });

      localStorage.setItem("teams", JSON.stringify(state.teams));
      toast.success("Pokemon added to team successfully.");
    },

    ADD_PERSISITED_DATA: (state, action: PayloadAction<Team[]>) => {
      state.teams.push(...action.payload);
    },

    REMOVE_ITEMS_FROM_CART: (state, action: PayloadAction<{ id: number }>) => {
      const filteredData = state.teams.filter(
        (el) => el.id != action.payload?.id
      );

      state.teams = filteredData;
      localStorage.setItem("teams", JSON.stringify(state.teams));

      toast.success("Pokemon removed from team successfully.");
    },
  },
});

export const { ADD_ITEM_TO_CART, ADD_PERSISITED_DATA, REMOVE_ITEMS_FROM_CART } =
  TeamSlice.actions;

export default TeamSlice.reducer;
