import Cookies from "js-cookie";
import {
  IRegisterParams,
  ILoginResponse,
  IProfileResponse,
  IStripePayment,
  IDeleteAccountResponse,
  ISupportMessageParams,
} from "../../types/IAuth";
import { IGeneralResponse, QueryRes } from "../../types/IGeneral";
import { apiSlice } from "../api";
import { setToken, setUser, setUserDetails } from "./authSlice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      IGeneralResponse<ILoginResponse>,
      { email: string; password: string }
    >({
      queryFn: async (args, api, _, baseQuery) => {
        const res = (await baseQuery({
          url: "/login",
          method: "POST",
          body: args,
        })) as QueryRes<IGeneralResponse<ILoginResponse>>;

        if ("data" in res) {
          const token = res.data?.token!;
          Cookies.set("token", token, { expires: 7 });
          Cookies.set("userDetails", JSON.stringify(res.data), { expires: 7 });
          api.dispatch(setToken(token));
          api.dispatch(setUserDetails(res.data as ILoginResponse));
        }
        return res;
      },
      invalidatesTags: ["Profile", "Instructor Profile", "Learner Profile"],
    }),
    forgotPassword: builder.mutation<void, { email: string }>({
      query: (body) => ({
        url: "/send-reset-link",
        method: "POST",
        body,
      }),
    }),
    verifyEmail: builder.mutation<void, { token: string }>({
      query: ({ token }) => ({
        url: `/verify-email/${token}`,
        method: "POST",
      }),
    }),
    register: builder.mutation<void, Partial<IRegisterParams>>({
      query: (body) => ({
        url: "/new-register",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation<
      void,
      { token: string; password: string; confirm_password: string }
    >({
      query: ({ token, confirm_password, password }) => ({
        url: `/reset-password/${token}`,
        method: `POST`,
        body: {
          password,
          confirm_password,
        },
      }),
    }),
    profile: builder.query<{ data: IProfileResponse }, void>({
      queryFn: async (args, api, _, baseQuery) => {
        const res = (await baseQuery({
          url: "/profile-info",
        })) as QueryRes<{ data: IProfileResponse }>;
        if ("data" in res) {
          api.dispatch(setUser(res.data?.data as IProfileResponse));
        }
        return res;
      },

      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation<IProfileResponse, Partial<IRegisterParams>>(
      {
        query: (body) => ({
          url: "/update-profile",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Instructor Profile", "Profile", "Learner Profile"],
      }
    ),
    payment: builder.mutation<
      IStripePayment,
      { amount: number; booking_id: number }
    >({
      query: (body) => ({
        url: `/stripe-payment`,
        method: "POST",
        body,
      }),
      invalidatesTags: (res) => (res ? ["Stripe Config"] : []),
    }),
    stripeConfig: builder.query<
      { success: boolean; publishableKey: string },
      void
    >({
      query: () => ({
        url: "/stripe-config",
        redirect: "follow",
      }),
      providesTags: ["Stripe Config"],
    }),
    completePayment: builder.mutation<
      {
        message: string;
        booking_id: number;
      },
      { booking_id: number }
    >({
      query: (body) => ({
        url: "/booking/complete-payment",
        method: "POST",
        body,
      }),
    }),
    deleteAccount: builder.mutation<
      IDeleteAccountResponse,
      { reason: string; additonal: string }
    >({
      queryFn: async (arg, api, _, baseQuery) => {
        const res = (await baseQuery({
          url: "/account-delete",
          method: "POST",
          body: { reason: arg.reason, additional: arg.additonal },
        })) as QueryRes<IDeleteAccountResponse>;
        if ("data" in res) {
          api.dispatch(setToken(null));
          api.dispatch(setUser(null));
          api.dispatch(setUserDetails(null));
          Cookies.remove("token");
          Cookies.remove("userDetails");
        }
        return res;
      },
    }),
    support: builder.mutation<{ success: boolean; message: string }, ISupportMessageParams>({
      query: (body) => ({
        url: "/support-message",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useRegisterMutation,
  useResetPasswordMutation,
  useProfileQuery,
  useUpdateProfileMutation,
  usePaymentMutation,
  useStripeConfigQuery,
  useCompletePaymentMutation,
  useDeleteAccountMutation,
  useSupportMutation
} = authApiSlice;
