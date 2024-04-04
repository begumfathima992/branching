import { IRegisterParams } from "../../types/IAuth";
import { IGenericBookings } from "../../types/IBooking";
import {  QueryRes } from "../../types/IGeneral";
import {
  IFilteredInstructors,
  IInstructorStats,
  IInstructorPaymentStats,
  IInstructorProfile,
  IInstructorProfileById,
  IInstructorReviews,
  IInstructorsResponse,
  IRatedInstructor,
  ITrackLearnersResponse,
} from "../../types/IInstructor";
import { ITrackLearnerDetails } from "../../types/ILearner";
import { apiSlice } from "../api";

export const instructorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    instructorProfile: builder.query<IInstructorProfile, void>({
      query: () => "/instructor-info",
      providesTags: ["Instructor Profile"],
    }),
    getAllInstructors: builder.query<IInstructorsResponse, void>({
      query: () => "/get-instructors",
      providesTags: ["Instructors"],
    }),
    getInstructorById: builder.query<IInstructorProfileById, { id: string }>({
      query: ({ id }) => `/instructor-detail/${id}`,
      providesTags: ["Instructors"],
    }),
    instructorUpcomingBookings: builder.query<
      IGenericBookings,
      { page: number; per_page: number; instructor_id: number }
    >({
      query: ({ page, per_page, instructor_id }) =>
        `/booking/list/${instructor_id}?per_page=${per_page}&page=${page}`,
      providesTags: ["Instructor Upcoming Bookings"],
    }),
    instructorPastBookings: builder.query<
      IGenericBookings,
      { page: number; per_page: number; instructor_id: number }
    >({
      query: ({ page, per_page, instructor_id }) =>
        `/booking/past-instructor/${instructor_id}?per_page=${per_page}&page=${page}`,
      providesTags: ["Instructor Past Bookings"],
    }),
    trackLearner: builder.query<
      ITrackLearnersResponse,
      { page: number; per_page: number }
    >({
      queryFn: async (args, api, _, baseQuery) => {
        const res = (await baseQuery({
          url: `/get-learners-tracking?per_page=${args.per_page}&page=${args.page}`,
        })) as QueryRes<ITrackLearnersResponse>;

        return res;
      },
      providesTags: ["Track Learners"],
    }),
    updateInstructor: builder.mutation<undefined, Partial<IRegisterParams>>({
      query: (body) => ({
        url: "/update-instructor",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Instructor Profile"],
    }),
    getFilteredInstructors: builder.query<
      IFilteredInstructors,
      {
        price: string;
        city: string;
        experience: string;
        sort_by: string | null;
      }
    >({
      queryFn: async (args, api, _, baseQuery) => {
        const res = (await baseQuery({
          url: `/get-instructors`,
          params: args,
        })) as QueryRes<IFilteredInstructors>;

        return res;
      },
    }),
    rateInstructor: builder.mutation<
      IRatedInstructor,
      { instructor_id: number; rating: number; feedback: string }
    >({
      query: (body) => ({
        url: "/feedback-instructor",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        "Instructor Profile",
        "Instructors",
        "Instructor Reviews",
      ],
    }),
    addTrackLearnerDetails: builder.mutation<
      ITrackLearnerDetails,
      { learner_id: number; weakness: string[]; strength: string[] }
    >({
      query: (body) => ({
        url: "/add-learner-tracking",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Track Learners"],
    }),
    getInstructorReviews: builder.query<
      IInstructorReviews,
      { instructor_id: number }
    >({
      query: ({ instructor_id }) => `/instructor-reviews/${instructor_id}`,
      providesTags: ["Instructor Reviews"],
    }),
    getInstructorStats: builder.query<IInstructorStats, number>({
      query: (id) => `/instructor-stats/${id}`,
      providesTags: ["Instructor Stats"],
    }),
    instructorPaymentStats: builder.query<
      IInstructorPaymentStats,
      { id: number; per_page: number; page: number }
    >({
      query: ({ id, page, per_page }) => ({
        url: `/instructor-payments/${id}?per_page=${per_page}&page=${page}`,
      }),
    }),
  }),
});

export const {
  useGetInstructorByIdQuery,
  useGetAllInstructorsQuery,
  useInstructorProfileQuery,
  useInstructorUpcomingBookingsQuery,
  useTrackLearnerQuery,
  useInstructorPastBookingsQuery,
  useUpdateInstructorMutation,
  useGetFilteredInstructorsQuery,
  useLazyGetFilteredInstructorsQuery,
  useRateInstructorMutation,
  useAddTrackLearnerDetailsMutation,
  useGetInstructorReviewsQuery,
  useGetInstructorStatsQuery,
  useInstructorPaymentStatsQuery
} = instructorApiSlice;