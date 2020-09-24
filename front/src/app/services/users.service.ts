import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Users } from '../interface/users';
import { Login } from '../interface/login';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private endpoint: string = environment.endpoint + 'users';

  constructor(private httpClient: HttpClient) { }

  get inLogged(): Observable<Boolean> {
    return this.loggedIn.asObservable();
  }

  login(authData): Observable<any> {
    return this.httpClient.post(`${environment.endpoint}/auth/login`, authData)
      .pipe(
        map((res: Login) => {
          //saved token
          console.log(res.token)
          this.saveToken(res.token);
          this.loggedIn.next(true);
          return res;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  getUsers() {
    return this.httpClient.get(this.endpoint);
  }

  saveUser(cities) {
    return this.httpClient.post<any>(`${this.endpoint}`, cities);
  }

  deleteUser(id) {
    return this.httpClient.delete(`${this.endpoint}/${id}`);
  }

  updateUser(id: string | number, updatedCities: Users): Observable<Users> {
    return this.httpClient.put(`${this.endpoint}/${id}`, updatedCities);
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