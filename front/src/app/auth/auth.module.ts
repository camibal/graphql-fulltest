import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component'; 
import { RegisterComponent } from './register/register.component'; 
import { LoginService } from '../services/login.service';
import { RegisterService } from '../services/register.service';
import { GraphQLModule } from './graphql.module';


@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    GraphQLModule
  ],
  providers: [
    LoginService,
    RegisterService
  ]
})
export class AuthModule { }
