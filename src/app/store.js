import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    
  },
});


// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../features/auth/authSlice'

// export const store = configureStore({
//    middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         // Ignore these action types
//         ignoredActions: ['your/action/type'],
//         // Ignore these field paths in all actions
//         ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
//         // Ignore these paths in the state
//         ignoredPaths: ['items.dates'],
//       },
//     }),

//   reducer: {
//     auth: authReducer,
//   },
// });
