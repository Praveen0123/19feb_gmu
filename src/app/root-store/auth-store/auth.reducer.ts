import { createReducer, on } from '@ngrx/store';

import * as authActions from './auth.actions';
import * as authState from './auth.state';
import { CognitoUser } from '@aws-amplify/auth';

export const reducer = createReducer(
    authState.initialAuthState,
    on(authActions.authDetailsReceived, (state, { isLoggedIn, userDetails }) => {
        const user: authState.UserDetails = {...userDetails} as authState.UserDetails;
        if (!localStorage.getItem('token')) {
            localStorage.setItem('token', user.accessToken.getJwtToken());
        }
        return {...state, isLoggedIn, userDetails: user};
    }),
    on(authActions.resetAuthDetails, (state) => authState.initialAuthState)
);
