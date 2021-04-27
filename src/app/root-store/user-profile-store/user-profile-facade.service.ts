import { Injectable } from '@angular/core';
import { FeedbackInput } from '@gql';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { UserProfileStore, IRootState } from '../root-store';
import { clearResetData, logoutRequest, requestToConfirmRegistration, saveFeedback } from './user-profile.actions';
import { ConfirmRegistrationRequest, ResetPasswordCodeResult, ResetPasswordRequest, UserDetails, UserLoginModel, UserRegistrationModel } from './user-profile.state';


@Injectable({
  providedIn: 'root'
})
export class UserProfileFacadeService
{
  constructor
    (
      private store: Store<IRootState>
    ) { }

  createUserProfile()
  {
    return this.store.dispatch(UserProfileStore.Actions.createUserProfile());
  }


  requestToSaveUserLoginForm(userLogin: UserLoginModel)
  {
    return this.store.dispatch(UserProfileStore.Actions.loginRequest({ userLogin }));
  }

  requestToSaveUserRegistrationForm(userRegistration: UserRegistrationModel)
  {
    return this.store.dispatch(UserProfileStore.Actions.requestToSaveUserRegistrationForm({ userRegistration }));
  }

  getRegistrationDetails()
  {
    return this.store.pipe(select(UserProfileStore.Selectors.getUserRegistration));
  }

  resetPasswordRequest(resetPasswordRequest: ResetPasswordRequest)
  {
    return this.store.dispatch(UserProfileStore.Actions.resetPasswordRequest({ resetPasswordRequest }));
  }

  resetPasswordCodeRequest(userName: string)
  {
    return this.store.dispatch(UserProfileStore.Actions.resetPasswordCodeRequest({ userName }));
  }
  requestToConfirmRegistration(confirmRegistrationRequest: ConfirmRegistrationRequest)
  {
    return this.store.dispatch(requestToConfirmRegistration({ confirmRegistrationRequest }));
  }

  getPasswordResetDetails(): Observable<ResetPasswordCodeResult>
  {
    return this.store.pipe(select(UserProfileStore.Selectors.getPasswordResetDetails));
  }

  getUserDetails(): Observable<UserDetails>
  {
    return this.store.pipe(select(UserProfileStore.Selectors.getUserDetails));
  }

  clearResetDetails()
  {
    return this.store.dispatch(clearResetData());
  }
  signOut()
  {
    return this.store.dispatch(logoutRequest());
  }
  saveFeedback(feedbackInput: FeedbackInput)
  {
    return this.store.dispatch(saveFeedback({ feedbackInput }));
  }
}
