import { FeedbackInput } from '@gql';
import { createAction, props } from '@ngrx/store';
import { UserRegistrationResult, UserLoginModel, UserProfileModel, UserRegistrationModel, ConfirmRegistrationRequest, ResetPasswordRequest, UserDetails } from './user-profile.state';

export const createUserProfile = createAction(
  '[UserProfile] Create User Profile'
);

export const userProfileReceived = createAction(
  '[UserProfile] user profile received',
  props<{ userProfileModel: UserProfileModel; }>()
);


export const requestToCreateUserLogin = createAction
  (
    '[UserLogin] request to save User Login form',
    props<{ userLogin: UserLoginModel; }>()
  );
export const loginRequest = createAction
  (
    '[UserLogin] Log In Request',
    props<{ userLogin: UserLoginModel; }>()
  );
export const logoutRequest = createAction
  (
    '[UserLogin] Log Out Request'
  );
export const logoutComplete = createAction
  (
    '[UserLogin] Log Out Complete'
  );


export const userDetailsReceived = createAction
  (
    '[UserLogin] Log In Result Received',
    props<{ user: UserDetails; }>()
  );

export const userLoginReceivedFromServer = createAction
  (
    '[UserLogin] User Login received from server',
    props<{ userLogin: UserLoginModel; }>()
  );

export const requestToSaveUserRegistrationForm = createAction
  (
    '[UserRegistration] request to save User Registration form',
    props<{ userRegistration: UserRegistrationModel; }>()
  );
export const clearRegistrationData = createAction
  (
    '[UserRegistration] Clear Registration Data',
  );
export const clearUserDetails = createAction
  (
    '[UserProfile] Clear User Details',
  );
export const requestToConfirmRegistration = createAction(
  '[UserRegistration] request to confirm User Registration',
  props<{ confirmRegistrationRequest: ConfirmRegistrationRequest; }>()
);

export const userRegistrationReceivedFromServer = createAction
  (
    '[UserRegistration] User Registration received from server',
    props<{ userRegistration: UserRegistrationResult; }>()
  );

export const userLoginFailure = createAction
  (
    '[UserProfile] Login Failure',
    props<{ error: any; }>()
  );

export const userRegistrationFailure = createAction
  (
    '[UserProfile] Registration Failure',
    props<{ error: any; }>()
  );

export const resetPasswordRequest = createAction(
  '[UserProfile] Reset Password Request',
  props<{ resetPasswordRequest: ResetPasswordRequest; }>()
);

export const resetPasswordCodeRequest = createAction(
  '[UserProfile] Reset Password Code Request',
  props<{ userName: string; }>()
);

export const resetResultReceived = createAction(
  '[UserProfile] Reset Password Result Received',
  props<{ resetPasswordResult: any; }>()
);
export const resetCodeResultReceived = createAction(
  '[UserProfile] Reset Password Code Result Received',
  props<{ resetPasswordCodeResult: any; }>()
);
export const userProfileSuccess = createAction(
  '[UserProfile] Success'
);
export const clearResetData = createAction
  (
    '[UserProfile] Clear Reset Data',
  );

export const saveFeedback = createAction(
  '[UserProfile] Save Feedback', props<{ feedbackInput: FeedbackInput; }>()
);