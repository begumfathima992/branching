import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {
  ILoginResponse,
  IProfileResponse,
  IRegisterParams,
} from "../../types/IAuth";

type IInitialState = {
  user: IProfileResponse | null;
  token: string | null;
  registerUser: Partial<IRegisterParams>;
  userDetails: ILoginResponse | null;
};

const initialState: IInitialState = {
  user: null,
  userDetails: Cookies.get("userDetails")
    ? JSON.parse(Cookies.get("userDetails") as string)
    : null,
  token: Cookies.get("token") || null,
  registerUser: {
    address: "",
    car_model: "",
    cities: [""],
    city: "",
    contact: "",
    description: "",
    fullname: "",
    languages: [""],
    price: 0,
    profile_picture: null,
    province: "",
    role: "",
    username: "",
    year_of_exp: 0,
    has_own_vehicle: false,
    vehicle_number: "",
    license_name: null,
    instructing_license: null,
    dob: "",
    suite: null,
    email: "",
    country: "canada",
    password: "",
    confirm_password: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<IProfileResponse | null>) => {
      state.user = action.payload;
    },
    registerUser: (state, action: PayloadAction<Partial<IRegisterParams>>) => {
      state.registerUser = { ...state.registerUser, ...action.payload };
    },
    setUserDetails: (state, action: PayloadAction<ILoginResponse | null>) => {
      state.userDetails = action.payload;
    },
    setbookingComplete: (state, action) => {},
  },
});

export const { setUser, registerUser, setToken, setUserDetails } =
  authSlice.actions;
