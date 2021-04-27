import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import {AuthState, authFeatureKey, UserDetails} from './auth.state';


export const authSlice = createFeatureSelector<AuthState>
  (
    authFeatureKey
  );

export const getUserDetails: MemoizedSelector<object, UserDetails> = createSelector(
    authSlice,
    (state: AuthState): UserDetails => state.userDetails
);

export const getIsLoggedIn: MemoizedSelector<object, boolean> = createSelector(
  authSlice,
  (state: AuthState): boolean => state.isLoggedIn && state.userDetails?.accessToken?.payload?.exp > Date.now()
);

export const getAuthDetails: MemoizedSelector<object, any> = createSelector(
  getUserDetails,
  getIsLoggedIn,
  (userDetails, isLoggedIn) => ({userDetails, isLoggedIn})
);

export const getUserRoles: MemoizedSelector<object, string[]> = createSelector(
  authSlice,
  (state: AuthState): string[] => state.userDetails.accessToken.payload.getExpiration()
);

export const getIsSME: MemoizedSelector<object, boolean> = createSelector(
  getUserRoles,
  (roles): boolean => roles.findIndex((x) => x === 'SME') !== -1
);

export const getSMEAreaOfStudy: MemoizedSelector<object, string> = createSelector(
  getUserRoles,
  (roles): string => roles.find(x => x.match(uuidRegex))
);

export const getIsAdmin: MemoizedSelector<object, boolean> = createSelector(
  getUserRoles,
  (roles): boolean => roles.findIndex((x) => x === 'admin') !== -1
);

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
