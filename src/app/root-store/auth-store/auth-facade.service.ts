import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IRootState, AuthStore } from '../root-store';
import { CognitoUser } from '@aws-amplify/auth';
import { UserDetails } from './auth.state';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root',
})
export class AuthFacadeService
{
    constructor(private store: Store<IRootState>, private authService: AuthService) { }

    getIsLoggedIn() {
        return this.store.pipe(select(AuthStore.Selectors.getIsLoggedIn));
    }

    getUserDetails() {
        return this.store.pipe(select(AuthStore.Selectors.getUserDetails));
    }

    requestSignIn() {
        return this.store.dispatch(AuthStore.Actions.requestSignIn());
    }
    requestSignOut() {
        return this.store.dispatch(AuthStore.Actions.requestSignOut());
    }
    signInDetailsReceived(data: CognitoUser|any) {
        let userDetails: UserDetails = null;
        try {
            userDetails = this.authService.convertToUserDetails(data);
        } catch(e) {
            console.error(e);
        }
        if (!userDetails) {
            return this.store.dispatch(AuthStore.Actions.resetAuthDetails());
        } else {
            return this.store.dispatch(AuthStore.Actions.authDetailsReceived({userDetails, isLoggedIn: true}));
        }
    }

}
