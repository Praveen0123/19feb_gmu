import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap, map, tap, catchError, concatMap, withLatestFrom, filter } from 'rxjs/operators';
import { IRootState } from '../root-store';
import { Store, select, Action } from '@ngrx/store';
import { AuthService } from './auth.service';
import { requestSignIn, authFailure, requestSignOut, authDetailsReceived, resetAuthDetails } from './auth.actions';
import { getAuthDetails } from './auth.selectors';
import { CognitoUser } from '@aws-amplify/auth';
import { Observable } from 'rxjs';
import { fakeAuthState } from './auth.state';
import { environment } from '@env/environment';
import { Router } from '@angular/router';


@Injectable()
export class AuthEffects
{
    constructor(private actions$: Actions,
        private store: Store<IRootState>,
        private authService: AuthService,
        private router: Router) { }


    requestSignIn$ = createEffect(() =>
    {
        return this.actions$.pipe(
            ofType(requestSignIn),
            map((action) =>
            {
                if (!environment.useAuth)
                {
                    return authDetailsReceived(fakeAuthState);
                } else
                {
                    this.authService.federatedLogin();
                    return authFailure({ error: 'nothing' });
                }
            }),
            catchError(error => of(authFailure({ error })))
        );
    });

    requestSignOut$ = createEffect(() => this.actions$.pipe(
        ofType(requestSignOut),
        map((action) =>
        {
            this.authService.signOut().finally(() =>
            {
                this.router.navigate(['/auth/signin']);
            });
            return resetAuthDetails();
        }),
        catchError(error => of(authFailure({ error }))))
    );

    requestAuthDetails$ = createEffect(
        () => this.actions$.pipe(
            ofType(requestSignOut),
            concatMap(
                action => of(action).pipe(
                    withLatestFrom(this.store.pipe(select(getAuthDetails)))
                )
            ),
            filter(([action, authState]) => !authState),
            switchMap((action) =>
            {
                return from(this.authService.getIsLoggedIn()).pipe(
                    map((user: CognitoUser) =>
                    {
                        const userDetails = this.authService.convertToUserDetails(user);
                        if (!userDetails)
                        {
                            return resetAuthDetails();
                        } else
                        {
                            return authDetailsReceived({ userDetails, isLoggedIn: true });
                        }
                    }),
                    catchError(error => of(authFailure({ error })))
                );
            }
            )
        ));
}
