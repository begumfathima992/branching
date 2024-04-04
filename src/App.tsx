import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthLayout from "./layouts/AuthLayout";
import BaseLayout from "./layouts/BaseLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import HomePage from "./pagesV2/HomePage";
import PrivateRoute from "./pagesV2/PrivateRoute";
import Login from "./pagesV2/auth/Login";
import Register from "./pagesV2/auth/Register";
import ResetPassword from "./pagesV2/auth/ResetPassword";
import VerifyEmail from "./pagesV2/auth/VerifyEmail";
import { Edit } from "./pagesV2/dashboard/Profile/Edit";
import { Dashboard } from "./pagesV2/dashboard";
import InstructorBookings from "./pagesV2/dashboard/Instructor/Booking";
import { TrackLearners } from "./pagesV2/dashboard/Instructor/TrackLearners";
import InstructorDetails from "./pagesV2/dashboard/Instructor/instructorDetails";
import { Profile } from "./pagesV2/dashboard/Profile/Profile";
import { ErroPage } from "./pagesV2/404";
import { TrackLearnerDetails } from "./pagesV2/dashboard/Instructor/TrackLearnerDetails";
import { Instructors } from "./pagesV2/dashboard/Learner/Instructors";
import { Pricing } from "./pagesV2/Pricing";
import AboutPage from "./pagesV2/AboutPage";
import ContactPage from "./pagesV2/ContactPage";
import { Support } from "./pagesV2/dashboard/Support";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <BaseLayout>
                <HomePage />
              </BaseLayout>
            }
          />
          <Route
            path="/pricing"
            element={
              <BaseLayout>
                <Pricing />
              </BaseLayout>
            }
          />
          <Route
            path="/aboutus"
            element={
              <BaseLayout>
                <AboutPage />
              </BaseLayout>
            }
          />
           <Route
            path="/contactus"
            element={
              <BaseLayout>
                <ContactPage />
              </BaseLayout>
            }
          />
          <Route
            path="/register"
            element={
              <AuthLayout>
                <Register />
              </AuthLayout>
            }
          />
          <Route
            path="/login"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />
          <Route
            path="/email-verify-link/:token"
            element={
              <AuthLayout>
                <VerifyEmail />
              </AuthLayout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/support"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Support />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/instructor-details/:id"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <InstructorDetails />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/profile"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Profile />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/profile/:edit"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Edit />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/bookings/:view"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <InstructorBookings />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/instructor/track-students"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <TrackLearners />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/instructors"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Instructors />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/instructor/track-students/:id"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <TrackLearnerDetails />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <AuthLayout>
                <ResetPassword />
              </AuthLayout>
            }
          />
          <Route path="/*" element={<ErroPage />} />
          {/*
              <Route
                path="/instructor/booking"
                element={<InstructorBooking />}
              ></Route>
              <Route
                path="/instructor/profile-complete"
                element={<InsProfComplete />}
              ></Route>
              <Route
                path="/student/profile-complete"
                element={<StudentProfComplete />}
              ></Route> */}
          {/* <Route
                path="/student-profile"
                element={
                  <PrivatePage>
                    <StudentDashboard setIsLoading={setisLoading} />
                  </PrivatePage>
                }
              ></Route>
              <Route
                path="/student-profile/:id"
                element={
                  <PrivatePage>
                    <StudentProfile setIsLoading={setisLoading} />
                  </PrivatePage>
                }
              ></Route> */}
          {/* <Route
                path="/instructor/track-students"
                element={<TrackStudent setIsLoading={setisLoading} />}
              ></Route>
              <Route
                path="/student/track-progress"
                element={<TrackProgress />}
              ></Route>
      */}

          {/* <Route
                path="/stripe/payment/:booking_id/:amount"
                element={<Payment />}
              />
              <Route
                path="/completion/:booking_id"
                element={<Completion setIsLoading={setisLoading} />}
              />
              <Route
                path="/learner-bookings"
                element={
                  <PrivatePage>
                    <LearnerBookingList setIsLoading={setisLoading} />
                  </PrivatePage>
                }
              /> */}
          {/* <Route
                path="profile"
                element={<Profile setIsLoading={setisLoading} />}
              ></Route>
              <Route
                path="/set-booking/:id/:amount"
                element={
                  <PrivatePage>
                    <BookingSteps setIsLoading={setisLoading} />
                  </PrivatePage>
                }
              /> */}
          {/* <Route
                path="/instructor-booking-list"
                element={
                  <PrivatePage>
                    <InstructorBookingList setIsLoading={setisLoading} />
                  </PrivatePage>
                }
              /> */}
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
