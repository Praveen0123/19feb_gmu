import { state } from '@angular/animations';
import { createFeatureSelector, MemoizedSelector, createSelector } from '@ngrx/store';
import { UserProfileState, userProfileFeatureKey, UserProfileModel, UserLoginModel, UserRegistrationModel, UserRegistrationResult, ResetPasswordCodeResult, UserDetails } from './user-profile.state';


export const userProfileSlice = createFeatureSelector<UserProfileState>
  (
    userProfileFeatureKey
  );


export const getUserProfile: MemoizedSelector<object, UserProfileModel> = createSelector
  (
    userProfileSlice,
    (state: UserProfileState): UserProfileModel => state.userProfileModel
  );


export const getUserLogin: MemoizedSelector<object, UserLoginModel> = createSelector
  (
    userProfileSlice,
    (state: UserProfileState): UserLoginModel => state.userLoginModel
  );

export const getUserRegistration: MemoizedSelector<object, UserRegistrationResult> = createSelector(
  userProfileSlice,
  (state: UserProfileState): UserRegistrationResult => state.userRegistration
);

export const getPasswordResetDetails: MemoizedSelector<object, ResetPasswordCodeResult> = createSelector(
  userProfileSlice,
  (state: UserProfileState): ResetPasswordCodeResult => state.passwordResetDetails
);

export const getUserDetails: MemoizedSelector<object, UserDetails> = createSelector(
  userProfileSlice,
  (state: UserProfileState): UserDetails => state.userDetails
);

