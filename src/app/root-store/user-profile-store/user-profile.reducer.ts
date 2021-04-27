import { createReducer, on } from '@ngrx/store';

import { initialConnectCoachState } from './user-profile.state';
import
{
  clearRegistrationData, userDetailsReceived, userLoginReceivedFromServer, userProfileReceived,
  userRegistrationReceivedFromServer, clearUserDetails, resetCodeResultReceived, clearResetData
} from './user-profile.actions';


export const reducer = createReducer
  (
    initialConnectCoachState,
    on(userProfileReceived, (state, { userProfileModel }) =>
    {
      return { ...state, userProfileModel };
    }),


    on(userLoginReceivedFromServer, (state, { userLogin }) =>
    {
      return { ...state, userLogin };
    }),


    on(userRegistrationReceivedFromServer, (state, { userRegistration }) =>
    {
      return { ...state, userRegistration };
    }),

    on(userDetailsReceived, (state, { user }) =>
    {
      return { ...state, userDetails: user };
    }),
    on(clearRegistrationData, (state) => ({ ...state, userRegistration: undefined })),
    on(clearUserDetails, (state) => ({ ...state, userDetails: undefined })),
    on(resetCodeResultReceived, (state, { resetPasswordCodeResult }) => ({ ...state, passwordResetDetails: resetPasswordCodeResult })),
    // on(clearResetData, (state) => ({ ...state, passwordResetDetails: undefined }))
  );

