import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CognitoUser } from 'amazon-cognito-identity-js';
import Auth from '@aws-amplify/auth';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate
{
  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
  {
    return Auth.currentAuthenticatedUser().then((user: CognitoUser) =>
    {
      if (localStorage.getItem('token') == null) { return this.onFailure(); }
      const roles: string[] = user.getSignInUserSession().getAccessToken()?.payload?.['cognito:groups'];
      Auth.currentUserInfo().then(user =>
      {
        localStorage.setItem('userAttributes', JSON.stringify(user.attributes));
      }).catch(
        (err) => console.error(err));
      return true;
    });
  }
  onFailure()
  {
    this.router.navigate(['/home/login']);
    return false;
  }
}

