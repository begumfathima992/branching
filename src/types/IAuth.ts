export type IRole = "INSTRUCTOR" | "LEARNER";

export type ILoginResponse = {
  success: boolean;
  id: string | null;
  role: IRole | null;
  token: string | null;
  learner_id: number | null;
  instructor_id: number | null;
  is_verified: boolean;
};

export type IProfileResponse = {
  address: string;
  city: string;
  contact: string;
  country: string;
  dob: string;
  full_name: string;
  id: number;
  profile_picture: string | null;
  province: string;
  role: IRole;
  user_id: number;
  username: string;
};

export type IRegisterParams = {
  description: string;
  has_own_vehicle: boolean;
  price: number;
  vehicle_number: string | ArrayBuffer | null;
  license_name: string | null;
  cities: string[] | null;
  languages: string[] | null;
  year_of_exp: number | null;
  car_model: string;
  instructing_license: string | null;
  fullname: string;
  username: string;
  profile_picture: string | null;
  city: string;
  province: string;
  contact: string;
  address: string;
  dob: string;
  role: IRole | string;
  suite: string | null;
  has_g1_completed: boolean;
  email: string;
  booke: boolean;
  country: string;
  password: string | null;
  confirm_password: string | null;
};

export type IStripePayment = {
  success: boolean;
  clientSecret: string;
  amount: string;
  booking_id: string;
};

export type IDeleteAccountResponse = {
  success: boolean;
  message: string;
  data: {
    email: string;
    role: IRole;
    fullname: string;
  };
};

export type ISupportMessageParams = {
  access_type: string;
  device_type: string;
  reason: string;
  attachment: string;
};
