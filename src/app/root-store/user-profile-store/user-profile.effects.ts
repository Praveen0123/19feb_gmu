import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, concatMap, withLatestFrom, filter, switchMap, catchError, tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { Store, select } from '@ngrx/store';
import { ISignUpResult } from 'amazon-cognito-identity-js';
import
{
  createUserProfile, loginRequest, requestToConfirmRegistration, requestToSaveUserRegistrationForm, userDetailsReceived,
  userProfileReceived, userRegistrationReceivedFromServer, clearRegistrationData, resetPasswordCodeRequest, resetCodeResultReceived,
  userProfileSuccess, userLoginFailure, resetPasswordRequest, resetResultReceived, clearResetData, logoutRequest, clearUserDetails, logoutComplete, userRegistrationFailure, saveFeedback
} from './user-profile.actions';
import { ConfirmRegistrationRequest, UserProfileModel, UserRegistrationResult } from './user-profile.state';
import { getUserProfile } from './user-profile.selectors';
import { UserProfileService } from './user-profile.service';
import { IRootState, UserProfileStore } from '../root-store';
import { NotificationService } from '@app/core/services/notification/notification.service';
import { create } from 'domain';
import { Router } from '@angular/router';
import { requestClearSelectedStudent } from '../student-store/student.actions';
import { Feedback } from '@gql';


@Injectable()
export class UserProfileEffects
{

  constructor
    (
      private actions$: Actions,
      private store: Store<IRootState>,
      private userProfileService: UserProfileService,
      private notificationService: NotificationService,
      private router: Router
    ) { }

  createUserProfile$ = createEffect(() => this.actions$.pipe
    (
      ofType(createUserProfile),
      concatMap(action => of(action).pipe
        (
          withLatestFrom
            (
              // basicInformationModel
              this.store.pipe(select(getUserProfile))
            )
        )),
      filter(([action, userProfileModel]) => !userProfileModel),
      map((action) =>
      {
        const userProfileModel: UserProfileModel =
        {
          userId: uuidv4()
        };

        return userProfileReceived({ userProfileModel });
      })
    )
  );

  login$ = createEffect(() => this.actions$.pipe(ofType(loginRequest),
    switchMap((action) =>
    {
      return this.userProfileService.signIn(action.userLogin.userName, action.userLogin.userPassword).pipe(
        map((rawUser) =>
        {
          const user = this.userProfileService.convertToUserDetails(rawUser);
          return userDetailsReceived({ user });
        }),
        catchError((error) =>
        {
          this.notificationService.error(error.message);
          return of(userLoginFailure({ error }));
        })
      );
    }),
    catchError((error) =>
    {
      this.notificationService.error(error.message);
      return of(userLoginFailure({ error }));
    })));

  signUp$ = createEffect(() => this.actions$.pipe(ofType(requestToSaveUserRegistrationForm),
    switchMap((action) =>
    {
      return this.userProfileService.signUp(action.userRegistration).pipe(
        map((results: ISignUpResult) =>
        {
          const userRegistration: UserRegistrationResult = (!results?.user) ? null : {
            userName: results.user.getUsername(),
            confirmed: results.userConfirmed
          };
          return userRegistrationReceivedFromServer({ userRegistration });
        }),
        catchError((error) =>
        {
          this.notificationService.error(error.message);
          return of(userRegistrationFailure({ error }));
        })
      );
    }
    )));
  confirmRegistration$ = createEffect(() => this.actions$.pipe(ofType(requestToConfirmRegistration),
    switchMap(
      (action) =>
      {
        const confirmRegistration: ConfirmRegistrationRequest = action.confirmRegistrationRequest;
        return this.userProfileService.confirmRegistration(confirmRegistration).pipe(
          map((results) =>
          {
            return clearRegistrationData();
          }),
          catchError((error) =>
          {
            this.notificationService.error(error.message);
            return of(userRegistrationFailure({ error }));
          })
        );
      }
    ),
    catchError((error) =>
    {
      this.notificationService.error(error.message);
      return of(userRegistrationFailure({ error }));
    })));
  resetPasswordCodeRequest$ = createEffect(() => this.actions$.pipe(ofType(resetPasswordCodeRequest),
    switchMap((action) =>
    {
      return this.userProfileService.forgotPassword(action.userName).pipe(
        map((results) =>
        {
          return resetCodeResultReceived({ resetPasswordCodeResult: results });
        }),
        catchError((error) =>
        {
          this.notificationService.error(error.message);
          return of(userRegistrationFailure({ error }));
        })
      );
    })));

  resetPasswordRequest$ = createEffect(() => this.actions$.pipe(ofType(resetPasswordRequest),
    switchMap((action) =>
    {
      return this.userProfileService.resetPassword(action.resetPasswordRequest.emailAddress, action.resetPasswordRequest.password, action.resetPasswordRequest.code).pipe(
        map((results) =>
        {
          return resetResultReceived({ resetPasswordResult: results });
        }),
        catchError((error) =>
        {
          this.notificationService.error(error.message);
          return of(userRegistrationFailure({ error }));
        })
      );
    })));
  clearRegistrationData$ = createEffect(() => this.actions$.pipe(ofType(clearRegistrationData),
    map(() =>
    {
      this.router.navigate(['/home/login']);
      this.notificationService.success('Registration Confirmed Successfully');
      return userProfileSuccess();
    })
  ));
  userDetailsReceived$ = createEffect(() => this.actions$.pipe(ofType(userDetailsReceived),
    map((action) =>
    {
      if (action.user)
      {
        const destination = (action.user?.isAdmin) ? ['/admin'] :
          (action.user?.isCoach) ? ['/coach'] : ['/student-view/first-time-profile'];
        this.router.navigate(destination);
        this.notificationService.success(`Logged in as ${action.user.userName}`);
      } else
      {
        this.notificationService.error('Authorization Unsuccessful');
      }
      return userProfileSuccess();
    })
  ));
  resetResultReceived$ = createEffect(() => this.actions$.pipe(ofType(resetResultReceived),
    map(() =>
    {
      this.router.navigate(['/home/login']);
      this.notificationService.success('Password Updated Succesfully');
      return clearResetData();
    }),
    catchError((error) =>
    {
      this.notificationService.error(error.message);
      return of(userRegistrationFailure({ error }));
    })
  ));

  logOutRequest$ = createEffect(() => this.actions$.pipe(ofType(logoutRequest),
    switchMap((action) =>
    {
      return this.userProfileService.signOut().pipe(
        tap(() => this.store.dispatch(clearUserDetails())),
        tap(() => this.store.dispatch(requestClearSelectedStudent())),
        tap(() =>
        {
          localStorage.removeItem('searchId');
          localStorage.removeItem('role');
        }),
        map(() => logoutComplete()));
    })));

  logOutSuccess$ = createEffect(() => this.actions$.pipe(ofType(logoutComplete),
    map(() =>
    {
      this.router.navigate(['/home/login']);
      this.notificationService.success('Logged Out');
      return userProfileSuccess();
    })
  ));
  saveFeedback$ = createEffect(() => this.actions$.pipe(ofType(saveFeedback),
    switchMap((action) =>
    {
      return this.userProfileService.saveFeedback(action.feedbackInput).pipe(
        map((feedback: Feedback) => userProfileSuccess())
      );
    })
  ));
}
