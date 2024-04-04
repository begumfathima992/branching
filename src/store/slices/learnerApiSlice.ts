import { IGenericBookings } from "../../types/IBooking";
import {
  ILearnerPaymentStats,
  ILearnerProfile,
  ILearnerReviewStatus,
  ILearnerStats,
  IUpdateLearner,
} from "../../types/ILearner";
import { apiSlice } from "../api";

export const learnerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      learnerProfile: builder.query<ILearnerProfile, void>({
        query: () => "/learner-info",
        providesTags: ["Learner Profile"],
      }),
      updateLearner: builder.mutation<undefined, IUpdateLearner>({
        query: (body) => ({
          url: "/update-learner",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Learner Profile"],
      }),
      learnerUpcomingBookings: builder.query<
        IGenericBookings,
        { page: number; per_page: number; learner_id: number }
      >({
        query: ({ page, per_page, learner_id }) =>
          `/booking/learner-list/${learner_id}?per_page=${per_page}&page=${page}`,
        providesTags: ["Learner Upcoming Bookings"],
      }),
      learnerPastBookings: builder.query<
        IGenericBookings,
        { page: number; per_page: number; learner_id: number }
      >({
        query: ({ page, per_page, learner_id }) =>
          `/booking/past-learner/${learner_id}?per_page=${per_page}&page=${page}`,
        providesTags: ["Learner Past Bookings"],
      }),
      leanerById: builder.query<ILearnerProfile, { learner_id: number }>({
        query: ({ learner_id }) => `/learner-detail/${learner_id}`,
        providesTags: ["Learner Profile"],
      }),
      getLearnerStats: builder.query<ILearnerStats, number>({
        query: (id) => `/learner-stats/${id}`,
        providesTags: ["Learner Stats"],
      }),
      getLeanerPaymentsStats: builder.query<
        ILearnerPaymentStats,
        { id: number; per_page: number; page: number }
      >({
        query: ({ id, per_page, page }) =>
          `/learner-payments/${id}?per_page=${per_page}&page=${page}`,
        providesTags: ["Learner Payment Stats"],
      }),
      getLearnerReviewStatus: builder.query<ILearnerReviewStatus, number>({
        query: (id) => `/learner-can-review/${id}`,
        providesTags: ["Learner Review Status"],
      }),
    };
  },
});

export const {
  useLearnerProfileQuery,
  useUpdateLearnerMutation,
  useLearnerPastBookingsQuery,
  useLearnerUpcomingBookingsQuery,
  useLeanerByIdQuery,
  useGetLearnerStatsQuery,
  useGetLeanerPaymentsStatsQuery,
  useGetLearnerReviewStatusQuery
} = learnerApiSlice;
