import { IRole } from "./IAuth";
import { IPagination } from "./IGeneral";

export type ICommonInstructorProfileResponse = {
  price: number;
  license_name: string | null;
  vehicle_number: string | null;
  cities: string[];
  languages: string[];
  year_of_exp: number;
  car_model: string;
  profile_picture: string | null;
  instructing_license: string | null;
  description: string;
  has_own_vehicle: boolean;
  calendly: unknown;
  feedback: string[];
  is_verified: boolean;
};

export type IInstructorDetails = ICommonInstructorProfileResponse & {
  rating: number;
  instructor_id: number;
  user_id: number;
  role: "INSTRUCTOR";
  full_name: string;
  username: string;
  country: string;
  city: string;
  province: string;
  contact: string;
  address: string;
};

export type IInstructorProfile = {
  data: IInstructor;
  instructor: IInstructorDetails;
};

export type IInstructor = {
  user_id: number;
  full_name: string;
  username: string;
  role: IRole;
  profile_picture: null;
  country: string;
  city: string;
  province: string;
  contact: string;
  address: string;
  dob: string;
  id: number;
};

export type IAllInstructor = ICommonInstructorProfileResponse & {
  profile_id: number;
  email: string;
  instructor_id: number;
  name: string;
  created_at: string;
  updated_at: string;
  rating: number;
};

export type IInstructorsResponse = {
  success: boolean;
  data: {};
  instructors: IAllInstructor[];
};

export type IInstructorProfileById = {
  success: boolean;
  data: IInstructor;
  instructor: IInstructorDetails;
};

export type ITrackLearnersResponse = {
  success: true;
  tracked_learners: ITrackLearners[];
  pagination: IPagination;
};

export type ITrackLearners = {
  track_id: number;
  learner_id: number;
  instruction_id: number;
  learner_name: string;
  learner_email: string;
  learner_phone: string;
  instructor_name: string;
  instructor_email: string;
  instructor_phone: string;
  learner_address: string;
  feedback: IFeedbacks;
  has_exam_booked: false;
  profile_picture: null;
  has_g1_completed: true;

  created_at: string;
  updated_at: string;
};
export type IFeedbacks = {
  strength: string[];
  weakness: string[];
  class_completed: number;
};

export type IFilteredInstructors = IInstructorsResponse & {
  pagination: IPagination;
};

export type IRatedInstructor = {
  success: true;
  message: "profile rated successfully";
  data: IInstructor;
  feedback_data: {
    instructor_id: string;
    feedback: string[];
    rating: number;
    learner_id: number;
  };
};

export type IInstructorReviews = {
  success: boolean;
  reviews: IReviews[];
  pagination: IPagination;
};

export type IReviews = {
  review_id: number;
  learner_id: number;
  instruction_id: number;
  learner_name: string;
  learner_email: string;
  learner_phone: string;
  instructor_name: string;
  instructor_email: string;
  instructor_phone: string;
  learner_address: string;
  feedback: string;
  rating: number;
  profile_picture: string | null;
  created_at: string;
  updated_at: string;
};

export type IInstructorStats = {
  success: boolean;
  data: {
    total_learner: number;
    total_paid_bookings: number;
    class_completed: string;
    total_earning: number;
    experience: number;
    total_bookings: number;
    upcoming_bookings: number;
  };
};

export type IInstructorPaymentStats = {
  success: boolean;
  payments: {
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
  }[];
  total_earning: number;
  pagination: IPagination;
};