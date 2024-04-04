import { IProfileResponse } from "./IAuth";
import { IPagination } from "./IGeneral";

export type ILearnerProfile = {
  success: boolean;
  data: IProfileResponse;
  learner: ILearner;
};

export type ILearner = {
  has_own_vehicle: boolean;
  vehicle_number: string | null;
  dl_number: string | null;
  license_name: "G2" | "G";
  has_g1_completed: boolean;
  learner_id: number;
  has_exam_booked: boolean;
  user_id: number;
  full_name: string;
  username: string;
  role: "LEARNER";
  profile_picture: string | null;
  country: string;
  city: string;
  province: string;
  contact: string;
  address: string;
  feedback: IFeedbacks;
};

export type IFeedbacks = {
  strength: string[];
  weakness: string[];
  class_completed: number;
};

export type ILearnerStats = {
  success: true;
  data: {
    total_paid_bookings: number;
    class_completed: string;
    total_spent: number;
    total_bookings: number;
    upcoming_bookings: number;
  };
};

export type IUpdateLearner = {
  has_own_vehicle: boolean;
  has_g1_completed: boolean;
  has_exam_booked: boolean;
  license_name: string;
  // vehicle_number: string;
  // dl_number: string;
};

export type ILearnerPaymentStats = {
  success: boolean;
  payments: ILearnerPayments[];
  total_earning: string;
  pagination: IPagination;
};

export type ILearnerPayments = {
  payment_id: number;
  learner_id: number;
  instruction_id: number;
  learner_name: string;
  learner_email: string;
  learner_phone: string;
  instructor_name: string;
  instructor_email: string;
  instructor_phone: string;
  learner_address: string;
  payment_method: string;
  amount: number;
  profile_picture: string | null;
  created_at: string;
};

export type ILearnerReviewStatus = {
  success: boolean;
  data: {
    instructor_name: string;
    instructor_email: string;
    instructor_phone: string;
    profile_picture: string;
  };
  can_review: boolean;
};

export type ITrackLearnerDetails = {
  success: boolean;
  data: {
    instructor_id: number;
    learner_id: number;
    feedback: {
      strength: string[];
      weakness: string;
    };
  };
  message: string;
};
