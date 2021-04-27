import { createAction, props } from '@ngrx/store';
import { CognitoUser } from '@aws-amplify/auth';
import { UserDetails } from './auth.state';




export const authDetailsReceived = createAction(
    '[Auth] auth details received',
    props<{ userDetails: UserDetails, isLoggedIn: boolean }>()
);

export const authFailure = createAction(
    '[Auth] auth failure',
    props<{ error: any; }>()
);

export const requestAuthDetails = createAction('[Auth] request auth details');

export const requestSignIn = createAction('[Auth] sign in requested');

export const requestSignOut = createAction('[Auth] sign out requested');

export const resetAuthDetails = createAction ('[Auth] reset auth details');
