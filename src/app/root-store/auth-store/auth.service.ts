import { Injectable } from '@angular/core';
import Auth from '@aws-amplify/auth';
import { Hub } from '@aws-amplify/core';
import { Subject, Observable } from 'rxjs';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { UserDetails, UserLoginDetails } from './auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  private authState: Subject<CognitoUser | any> = new Subject<CognitoUser | any>();
  authStateObservable: Observable<CognitoUser | any> = this.authState.asObservable();

  constructor()
  {
    Hub.listen('auth', (data) =>
    {
      const { channel, payload } = data;
      if (channel === 'auth')
      {
        this.authState.next(payload.event);
      }
    });
  }

  federatedLogin(): Promise<any>
  {
    return Auth.federatedSignIn();
  }

  signIn(signInDetails: UserLoginDetails): Promise<any>
  {
    return Auth.signIn(signInDetails.userName, signInDetails.password);
  }

  signOut(): Promise<any>
  {
    return Auth.signOut();
  }

  getIsLoggedIn(): Promise<CognitoUser | any>
  {
    return Auth.currentAuthenticatedUser();
  }

  convertToUserDetails(cognitoUser: CognitoUser): UserDetails
  {
    const isLoggedIn = cognitoUser?.getSignInUserSession()?.isValid();
    if (!isLoggedIn)
    {
      return null;
    }
    const accessToken = cognitoUser.getSignInUserSession().getAccessToken();
    localStorage.setItem('token', accessToken.getJwtToken());
    const roles: string[] = accessToken.payload?.['cognito:groups'];
    const isAdmin = roles?.find(x => x === 'admin') != null;
    const isStudent = roles?.find(x => x === 'student') != null;
    const userDetails: UserDetails = {
      userName: cognitoUser.getUsername(),
      accessToken,
      roles,
      isAdmin,
    };
    return userDetails;
  }
}
