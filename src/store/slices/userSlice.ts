import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICities, IStates } from "../../types/IExtra";

type IInitialState = {
  states: IStates | null;
  cities: ICities | null;
};

const cities = localStorage.getItem("cities");
const states = localStorage.getItem("states");

const initialState: IInitialState = {
  states: JSON.parse(states as string) || null,
  cities: JSON.parse(cities as string) || null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<IStates>) => {
      state.states = action.payload;
    },
    setCities: (state, action: PayloadAction<ICities>) => {
      state.cities = action.payload;
    },
  },
});

export const { setState, setCities } = userSlice.actions;
