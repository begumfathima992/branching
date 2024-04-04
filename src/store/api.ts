import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_ENDPOINT,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set("authorization", `${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "Instructors",
    "Learner Profile",
    "Profile",
    "Instructor Profile",
    "Track Learners",
    "Stripe Config",
    "Learner Upcoming Bookings",
    "Instructor Upcoming Bookings",
    "Learner Past Bookings",
    "Instructor Past Bookings",
    "Instructor Reviews",
    "Instructor Stats",
    "Instructor Payment Stats",
    "Learner Stats",
    "Learner Payment Stats",
    "Learner Review Status"
  ],
});
