import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Login } from '../interface/login';
import { Router } from '@angular/router';

const helper = new JwtHelperService();

const LOGIN_USER = gql`
mutation login($username: String! $password: String!) {
  signIn(login: { username: $username, password: $password }) {
    token
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private _apollo: Apollo, private router: Router) {
    this.checkToken();
  }

  get inLogged(): Observable<Boolean> {
    return this.loggedIn.asObservable();
  }

  loginUser(login) {
    return this._apollo.mutate({
      mutation: LOGIN_USER,
      variables: {
        username: login.username,
        password: login.password
      }
    }).pipe(
      map((res: any) => {
        //saved token
        this.saveToken(res.data.signIn.token);
        this.loggedIn.next(true);
        return res;
      }),
      catchError((err) => this.handlerError(err))
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    // this.router.navigate(['/'])
  }

  private checkToken(): void {
    const userToken = localStorage.getItem('token')
    const isExpired = helper.isTokenExpired(userToken);
    console.log('isExpired->', isExpired);
    if (isExpired) {
      this.logout();
    } else {
      this.loggedIn.next(true);
    }
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
  private handlerError(err): Observable<never> {
    let errorMessage = 'An error ocurred retrienving data';
    if (err) {
      errorMessage = `Error: code ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
