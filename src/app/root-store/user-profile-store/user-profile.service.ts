import { Injectable } from '@angular/core';
import { Observable, from, of, forkJoin } from 'rxjs';
import { Auth } from 'aws-amplify';
import { CognitoUser, ISignUpResult } from 'amazon-cognito-identity-js';
import { ConfirmRegistrationRequest, UserDetails, UserRegistrationModel } from './user-profile.state';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Feedback, FeedbackInput, SaveFeedbackGQL } from '@gql';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService
{

  constructor(
    private saveFeedbackGQL: SaveFeedbackGQL
  ) { }
  signIn(userName: string, password: string): Observable<any>
  {
    return from(Auth.signIn(userName, password));
  }

  signOut(): Observable<any>
  {
    localStorage.setItem('token', null);
    return from(Auth.signOut());
  }

  signUp(userRegistration: UserRegistrationModel): Observable<ISignUpResult>
  {
    return from(Auth.signUp({
      username: userRegistration.emailAddress,
      password: userRegistration.password,
      attributes: {
        email: userRegistration.emailAddress,
        given_name: userRegistration.firstName,
        family_name: userRegistration.lastName,
        'custom:studentid': userRegistration.studentId
      }
    })
    );
  }

  confirmRegistration(confirmRegistration: ConfirmRegistrationRequest)
  {
    return from(Auth.confirmSignUp(confirmRegistration.email, confirmRegistration.code));
  }

  forgotPassword(userName: string)
  {
    return forkJoin({ request: from(Auth.forgotPassword(userName)), email: of(userName) });
  }

  resetPassword(userName: string, password: string, code: string)
  {
    return from(Auth.forgotPasswordSubmit(userName, code, password));
  }

  convertToUserDetails(cognitoUser: CognitoUser): Maybe<UserDetails>
  {
    const isLoggedIn = cognitoUser?.getSignInUserSession()?.isValid();
    if (!isLoggedIn)
    {
      localStorage.setItem('token', null);
      return null;
    }
    const session = cognitoUser.getSignInUserSession();
    const accessToken = session.getIdToken();

    localStorage.setItem('token', accessToken.getJwtToken());
    const roles: string[] = accessToken.payload?.['cognito:groups'];
    const isAdmin = roles?.find(x => x === 'admin') != null;
    const isStudent = roles?.find(x => x === 'student') != null;
    const isCoach = accessToken.payload?.['custom:organization'] === 'coach';
    if (isCoach)
    {
      localStorage.setItem('role', 'coach');
    }
    const userDetails: UserDetails = {
      userName: cognitoUser.getUsername(),
      accessToken,
      roles,
      isAdmin,
      isStudent,
      isCoach
    };
    return userDetails;
  }
  async getIsCoach(cognitoUser: CognitoUser): Promise<boolean>
  {
    return new Promise((resolve, reject) =>
    {
      cognitoUser.getUserAttributes((err, result) => result.find(x => x.Name === 'custom:organization')?.Value === 'coach');
    });
  }

  saveFeedback(feedbackInput: FeedbackInput)
  {
    console.log(feedbackInput);
    return this.saveFeedbackGQL.mutate({ feedbackInput }).pipe(
      map(apolloQueryResults =>
      {
        console.log('results');
        if (apolloQueryResults.data)
        {
          const feedback: Feedback = apolloQueryResults.data.saveFeedback as Feedback;
          return feedback;
        }
      })
    );
  }
}
