import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/interface/login';
import { LoginService } from 'src/app/services/login.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, BehaviorSubject, throwError } from 'rxjs';

const helper = new JwtHelperService();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loggedIn = new BehaviorSubject<boolean>(false);

  error: any;
  user: boolean = false;

  login: LoginResponse = {
    username: '',
    password: ''
  };

  constructor(private router: Router, private loginService: LoginService) {
  }

  ngOnInit(): void { }

  saveLogin() {
    this.loginService.loginUser(this.login).subscribe(res => {
      alert('is Logged');
      this.router.navigate(['/'])
    }, error => {
      console.error(error)
    }
    );
  }
}
