import { IPagination } from "./IGeneral";

export type IAvailableTimesForBooking = {
  time: string;
  is_taken: boolean;
};

export type IGenericBookings = {
  bookings: IBookings[];
  pagination: IPagination;
};
export type IBookings = {
  booking_id: number;
  learner_id: number;
  instruction_id: number;
  date: string;
  time: string;
  learner_name: string;
  learner_email: string;
  learner_phone: string;
  instructor_name: string;
  instructor_email: string;
  instructor_phone: string;
  learner_address: string;
  approved: boolean;
  comment: string;
  profile_picture: string | null;
  has_paid: boolean;
  instructor_price: number;
  instructor_price_per_hour: number;
};

export type IBookingCreateResponse = {
  booking_id: number;
  learner_id: number;
  instruction_id: number;
  date: string;
  time: string;
  learner_name: string;
  learner_email: string;
  learner_phone: string;
  learner_address: string;
  instructor_name: string;
  instructor_email: string;
  instructor_phone: string;
  instructor_price: number;
  instructor_address: string;
  comments: string;
  has_exam_booked: boolean;
  message: string;
};

export type IAvailabelBookingTimes = {
  times: { time: string; is_taken: boolean }[];
};
