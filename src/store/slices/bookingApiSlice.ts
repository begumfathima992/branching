import {
  IAvailabelBookingTimes,
  IBookingCreateResponse,
} from "../../types/IBooking";
import { apiSlice } from "../api";

export const bookingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation<
      IBookingCreateResponse,
      {
        instructor_id: number;
        learner_id: number;
        date: string;
        time: string;
        comments: string;
      }
    >({
      query: (body) => ({
        url: `/booking/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Learner Upcoming Bookings"],
    }),
    cancelBooking: builder.mutation<
      { message: string; booking_id: number },
      { booking_id: number }
    >({
      query: (body) => ({
        url: "/booking/cancel",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        "Learner Upcoming Bookings",
        "Instructor Upcoming Bookings",
      ],
    }),
    approveBooking: builder.mutation<
      { message: string; booking_id: number },
      { booking_id: number }
    >({
      query: (body) => ({ url: "/booking/approved", method: "POST", body }),
      invalidatesTags: ["Instructor Upcoming Bookings"],
    }),
    getAvailableBookingTimes: builder.mutation<
      IAvailabelBookingTimes,
      { instructor_id: number; date: string }
    >({
      query: (body) => ({
        url: "/booking/available-times",
        method: "POST",
        body,
      }),
    }),
    rescheduleBooking: builder.mutation<
      void,
      { booking_id: number; date: string; time: string }
    >({
      query: (body) => ({
        url: "/booking/reschedule",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Learner Upcoming Bookings"],
    }),
  }),
});

export const {
  useCancelBookingMutation,
  useApproveBookingMutation,
  useCreateBookingMutation,
  useGetAvailableBookingTimesMutation,
  useRescheduleBookingMutation,
} = bookingApiSlice;
